from datetime import datetime, timezone, timedelta
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.contact import ContactSubmission
from app.schemas.contact import ContactCreate


class ContactRepository:
    @staticmethod
    def create(
        db: Session,
        data: ContactCreate,
        ip_hash: Optional[str] = None,
        user_agent: Optional[str] = None,
        referrer: Optional[str] = None,
        is_spam: bool = False,
    ) -> ContactSubmission:
        submission = ContactSubmission(
            name=data.name,
            email=data.email,
            company=data.company,
            phone=data.phone,
            project_type=data.project_type,
            budget_range=data.budget_range,
            timeline=data.timeline,
            message=data.message,
            status="spam" if is_spam else "new",
            source="website_contact",
            ip_hash=ip_hash,
            user_agent=user_agent,
            referrer=referrer or data.referrer,
            utm_source=data.utm_source,
            utm_medium=data.utm_medium,
            utm_campaign=data.utm_campaign,
        )
        db.add(submission)
        db.commit()
        db.refresh(submission)
        return submission

    @staticmethod
    def find_recent_duplicate(
        db: Session,
        email: str,
        message: str,
        within_seconds: int = 120,
    ) -> Optional[ContactSubmission]:
        cutoff = datetime.now(timezone.utc) - timedelta(seconds=within_seconds)
        stmt = (
            select(ContactSubmission)
            .where(
                ContactSubmission.email == email,
                ContactSubmission.created_at >= cutoff,
            )
            .order_by(ContactSubmission.created_at.desc())
        )
        recent = db.scalars(stmt).first()
        if recent and recent.message.strip().lower() == message.strip().lower():
            return recent
        return None
