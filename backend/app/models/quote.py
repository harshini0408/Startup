import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, JSON
from sqlalchemy.sql import func
from app.core.database import Base
from app.models.contact import GUID


class QuoteRequest(Base):
    __tablename__ = "quote_requests"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    services = Column(JSON, nullable=False)
    project_stage = Column(String(100), nullable=False)
    priorities = Column(JSON, nullable=False)
    budget_range = Column(String(100), nullable=False)
    timeline = Column(String(100), nullable=False)

    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    company = Column(String(150), nullable=True)
    phone = Column(String(50), nullable=True)
    project_description = Column(Text, nullable=True)

    status = Column(String(50), nullable=False, default="new", index=True)
    source = Column(String(50), nullable=False, default="website_quote")

    # Abuse and marketing telemetry
    ip_hash = Column(String(64), nullable=True, index=True)
    user_agent = Column(String(500), nullable=True)
    referrer = Column(String(500), nullable=True)
    utm_source = Column(String(100), nullable=True)
    utm_medium = Column(String(100), nullable=True)
    utm_campaign = Column(String(100), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        server_default=func.now(),
        index=True,
    )
    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        server_default=func.now(),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    def __repr__(self):
        return f"<QuoteRequest(id={self.id}, name={self.name}, status={self.status})>"
