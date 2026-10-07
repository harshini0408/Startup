import re
from typing import Optional
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field, field_validator
from app.utils.sanitization import clean_text, normalize_email


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full name")
    email: str = Field(..., min_length=5, max_length=255, description="Work email")
    company: Optional[str] = Field(default=None, max_length=150, description="Organization / venture")
    phone: Optional[str] = Field(default=None, max_length=50)
    project_type: Optional[str] = Field(default="Web Application", max_length=100)
    budget_range: Optional[str] = Field(default=None, max_length=100)
    timeline: Optional[str] = Field(default=None, max_length=100)
    message: str = Field(..., min_length=15, max_length=5000, description="Project context and requirements")

    # Anti-spam & metadata
    website_url: Optional[str] = Field(default=None, description="Honeypot field (must remain empty)")
    form_start_time: Optional[float] = Field(default=None, description="Client form start timestamp")
    utm_source: Optional[str] = Field(default=None, max_length=100)
    utm_medium: Optional[str] = Field(default=None, max_length=100)
    utm_campaign: Optional[str] = Field(default=None, max_length=100)
    referrer: Optional[str] = Field(default=None, max_length=500)

    @field_validator("name", "company", "message", "project_type", "budget_range", "timeline", "phone", mode="before")
    @classmethod
    def sanitize_strings(cls, v: Optional[str]) -> Optional[str]:
        return clean_text(v)

    @field_validator("email", mode="before")
    @classmethod
    def validate_and_normalize_email(cls, v: str) -> str:
        cleaned = normalize_email(v)
        # RFC 5322 compatible email check
        pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if not re.match(pattern, cleaned):
            raise ValueError("Please provide a valid email address.")
        return cleaned


class ContactRead(BaseModel):
    id: UUID
    name: str
    email: str
    company: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
