from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import hash_ip
from app.utils.request_meta import get_client_ip, get_client_user_agent, get_client_referrer
from app.schemas.quote import QuoteCreate
from app.schemas.common import ApiResponse
from app.services.lead_service import LeadService

router = APIRouter()


@router.post("/quote", response_model=ApiResponse)
def post_quote(
    payload: QuoteCreate,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
):
    """
    Submits a 6-step guided scope estimator inquiry.
    Validates all steps, checks rate limits, saves lead to database,
    and returns a unique project reference tracking ID.
    """
    client_ip = get_client_ip(request)
    ip_hash = hash_ip(client_ip)
    user_agent = get_client_user_agent(request)
    referrer = get_client_referrer(request)

    success, message, ref_id, status_code = LeadService.process_quote_request(
        db=db,
        payload=payload,
        ip_hash=ip_hash,
        user_agent=user_agent,
        referrer=referrer,
    )

    response.status_code = status_code

    return ApiResponse(
        success=success,
        message=message,
        reference_id=ref_id,
    )
