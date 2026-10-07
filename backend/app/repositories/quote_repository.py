from datetime import datetime, timezone, timedelta
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.quote import QuoteRequest
from app.schemas.quote import QuoteCreate


class QuoteRepository:
    @staticmethod
    def create(
        db: Session,
        data: QuoteCreate,
        ip_hash: Optional[str] = None,
        user_agent: Optional[str] = None,
        referrer: Optional[str] = None,
        is_spam: bool = False,
    ) -> QuoteRequest:
        quote = QuoteRequest(
            services=data.services,
            project_stage=data.project_stage,
            priorities=data.priorities,
            budget_range=data.budget_range,
            timeline=data.timeline,
            name=data.name,
            email=data.email,
            company=data.company,
            phone=data.phone,
            project_description=data.project_description,
            status="spam" if is_spam else "new",
            source="website_quote",
            ip_hash=ip_hash,
            user_agent=user_agent,
            referrer=referrer or data.referrer,
            utm_source=data.utm_source,
            utm_medium=data.utm_medium,
            utm_campaign=data.utm_campaign,
        )
        db.add(quote)
        db.commit()
        db.refresh(quote)
        return quote

    @staticmethod
    def find_recent_duplicate(
        db: Session,
        email: str,
        within_seconds: int = 120,
    ) -> Optional[QuoteRequest]:
        cutoff = datetime.now(timezone.utc) - timedelta(seconds=within_seconds)
        stmt = (
            select(QuoteRequest)
            .where(
                QuoteRequest.email == email,
                QuoteRequest.created_at >= cutoff,
            )
            .order_by(QuoteRequest.created_at.desc())
        )
        return db.scalars(stmt).first()
