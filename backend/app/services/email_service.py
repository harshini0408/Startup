import logging
from typing import Optional
from app.core.config import settings
from app.models.contact import ContactSubmission
from app.models.quote import QuoteRequest

logger = logging.getLogger("ignite.email")


class EmailService:
    """
    Email delivery abstraction for Ignite°.
    Supports Resend API and Console/Mock logging fallback for local development.
    Guarantees that email delivery failures NEVER crash lead persistence.
    """

    @classmethod
    def _send_email(cls, to: str, subject: str, text_body: str) -> bool:
        """Internal helper to dispatch emails via configured provider."""
        provider = (settings.EMAIL_PROVIDER or "console").lower()

        # If Resend is configured with valid API key
        if provider == "resend" and settings.RESEND_API_KEY:
            try:
                import resend
                resend.api_key = settings.RESEND_API_KEY

                params = {
                    "from": settings.FROM_EMAIL,
                    "to": [to],
                    "subject": subject,
                    "text": text_body,
                }
                resend.Emails.send(params)
                logger.info(f"Email successfully dispatched via Resend to {to}: '{subject}'")
                return True
            except Exception as e:
                logger.error(f"Resend email delivery failed to {to}: {str(e)}", exc_info=False)
                return False

        # Fallback to structured console logging (ideal for local development/zero credentials)
        logger.info(
            f"\n--- [EMAIL DISPATCH via {provider.upper()}] ---\n"
            f"TO: {to}\n"
            f"FROM: {settings.FROM_EMAIL}\n"
            f"SUBJECT: {subject}\n"
            f"BODY:\n{text_body}\n"
            f"----------------------------------------------"
        )
        return True

    @classmethod
    def send_contact_notification(cls, submission: ContactSubmission) -> bool:
        """Internal notification sent to the Ignite founding team."""
        try:
            subject = f"New Ignite inquiry — {submission.name} / {submission.company or 'Individual'}"
            body = (
                f"New website inquiry received on Ignite°\n\n"
                f"Reference ID: {submission.id}\n"
                f"Name: {submission.name}\n"
                f"Email: {submission.email}\n"
                f"Company: {submission.company or 'N/A'}\n"
                f"Phone: {submission.phone or 'N/A'}\n"
                f"Project Type: {submission.project_type or 'N/A'}\n"
                f"Budget Range: {submission.budget_range or 'N/A'}\n"
                f"Timeline: {submission.timeline or 'N/A'}\n\n"
                f"Message:\n{submission.message}\n\n"
                f"Submitted At: {submission.created_at}\n"
                f"Source: {submission.source}\n"
                f"UTM: source={submission.utm_source}, medium={submission.utm_medium}, campaign={submission.utm_campaign}\n"
            )
            return cls._send_email(settings.LEAD_NOTIFICATION_EMAIL, subject, body)
        except Exception as e:
            logger.error(f"Failed to generate contact notification email: {e}")
            return False

    @classmethod
    def send_contact_acknowledgement(cls, submission: ContactSubmission) -> bool:
        """Client acknowledgement sent directly to the prospective client."""
        try:
            first_name = submission.name.split()[0] if submission.name else "there"
            subject = "We've received your brief — Ignite°"
            body = (
                f"Hi {first_name},\n\n"
                f"Thanks for reaching out to Ignite°.\n\n"
                f"We've received your project brief and will review what you're looking to build.\n\n"
                f"Reference:\n{submission.id}\n\n"
                f"We'll get back to you directly at this email address.\n\n"
                f"— Ignite°\n"
                f"Engineering & Design Studio\n"
            )
            return cls._send_email(submission.email, subject, body)
        except Exception as e:
            logger.error(f"Failed to send contact acknowledgement email: {e}")
            return False

    @classmethod
    def send_quote_notification(cls, quote: QuoteRequest) -> bool:
        """Internal notification for guided 6-step quote wizard submissions."""
        try:
            services_str = ", ".join(quote.services) if isinstance(quote.services, list) else str(quote.services)
            priorities_str = ", ".join(quote.priorities) if isinstance(quote.priorities, list) else str(quote.priorities)

            subject = f"New project brief — {quote.name} / {quote.company or 'Individual'}"
            body = (
                f"New 6-step project estimate brief received on Ignite°\n\n"
                f"Reference ID: {quote.id}\n"
                f"Name: {quote.name}\n"
                f"Email: {quote.email}\n"
                f"Company: {quote.company or 'N/A'}\n"
                f"Phone: {quote.phone or 'N/A'}\n\n"
                f"Services Requested: {services_str}\n"
                f"Project Stage: {quote.project_stage}\n"
                f"Key Priorities: {priorities_str}\n"
                f"Budget Range: {quote.budget_range}\n"
                f"Target Timeline: {quote.timeline}\n\n"
                f"Project Description:\n{quote.project_description or 'No additional notes provided.'}\n\n"
                f"Submitted At: {quote.created_at}\n"
                f"Source: {quote.source}\n"
            )
            return cls._send_email(settings.LEAD_NOTIFICATION_EMAIL, subject, body)
        except Exception as e:
            logger.error(f"Failed to generate quote notification email: {e}")
            return False

    @classmethod
    def send_quote_acknowledgement(cls, quote: QuoteRequest) -> bool:
        """Client acknowledgement for quote estimator submissions."""
        try:
            first_name = quote.name.split()[0] if quote.name else "there"
            subject = "We've received your project brief — Ignite°"
            body = (
                f"Hi {first_name},\n\n"
                f"Thanks for reaching out to Ignite°.\n\n"
                f"We've received your project brief and will review what you're looking to build.\n\n"
                f"Reference:\n{quote.id}\n\n"
                f"We'll get back to you directly at this email address.\n\n"
                f"— Ignite°\n"
                f"Engineering & Design Studio\n"
            )
            return cls._send_email(quote.email, subject, body)
        except Exception as e:
            logger.error(f"Failed to send quote acknowledgement email: {e}")
            return False
