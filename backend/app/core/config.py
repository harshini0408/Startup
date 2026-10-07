import os
from typing import List, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Centralized Ignite backend application configuration.
    Uses Pydantic Settings to load and validate environment variables.
    """
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=True,
    )

    APP_NAME: str = "Ignite° API"
    APP_ENV: str = Field(default="development", description="development | production | test")
    DEBUG: bool = Field(default=True)
    API_V1_STR: str = "/api"

    # Database: Default target PostgreSQL; supports SQLite fallback for local zero-setup
    DATABASE_URL: str = Field(
        default="postgresql+psycopg://postgres:root@localhost:5432/ignite_db",
        description="SQLAlchemy database connection string",
    )

    # Allowed CORS Origins
    FRONTEND_URL: str = Field(default="http://localhost:5173")
    CORS_ORIGINS: Union[List[str], str] = Field(
        default=["http://localhost:5173", "http://127.0.0.1:5173"],
        description="Allowed frontend origin URLs",
    )

    # Email provider abstraction
    EMAIL_PROVIDER: str = Field(
        default="console",
        description="resend | console | mock",
    )
    RESEND_API_KEY: str = Field(default="")
    FROM_EMAIL: str = Field(default="Ignite° Studio <inquiries@ignite-studio.com>")
    LEAD_NOTIFICATION_EMAIL: str = Field(default="founders@ignite-studio.com")

    # Security & Abuse Mitigation
    IP_HASH_SECRET: str = Field(
        default="ignite-prod-salt-secret-key-change-in-env",
        description="Salt used to hash client IP addresses to prevent plain IP storage",
    )
    RATE_LIMIT_PER_10_MINUTES: int = Field(default=5)
    MIN_SUBMISSION_TIME_SECONDS: float = Field(default=1.5)

    # Optional Cloudflare Turnstile
    TURNSTILE_SECRET_KEY: str = Field(default="")

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            if not v:
                return []
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    @property
    def is_production(self) -> bool:
        return self.APP_ENV.lower() == "production"

    @property
    def enable_docs(self) -> bool:
        return not self.is_production or self.DEBUG


settings = Settings()
