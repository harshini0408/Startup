import logging
from typing import Tuple, Optional
from sqlalchemy.orm import Session
from app.schemas.contact import ContactCreate
from app.schemas.quote import QuoteCreate
from app.models.contact import ContactSubmission
from app.models.quote import QuoteRequest
from app.repositories.contact_repository import ContactRepository
from app.repositories.quote_repository import QuoteRepository
from app.services.spam_service import SpamService
from app.services.email_service import EmailService

logger = logging.getLogger("ignite.leads")


class LeadService:
    @classmethod
    def process_contact_submission(
        cls,
        db: Session,
        payload: ContactCreate,
        ip_hash: Optional[str],
        user_agent: Optional[str],
        referrer: Optional[str],
    ) -> Tuple[bool, str, Optional[str], int]:
        """
        Processes a direct contact inquiry:
        1. Rate limits per IP
        2. Checks honeypot & timing
        3. Identifies duplicates
        4. Saves to database
        5. Attempts notification & acknowledgement emails (non-blocking)
        Returns: (success, message, reference_id, http_status_code)
        """
        # Layer 3: Rate Limiting
        allowed, reason = SpamService.check_rate_limit(ip_hash)
        if not allowed:
            return False, reason, None, 429

        # Layer 1 & 2: Honeypot & Timing
        is_bot = SpamService.is_honeypot_triggered(payload.website_url)
        is_fast = SpamService.is_too_fast(payload.form_start_time)
        is_spam = is_bot or is_fast

        # Layer 4: Duplicate Submission Check
        existing = ContactRepository.find_recent_duplicate(
            db, payload.email, payload.message, within_seconds=120
        )
        if existing:
            logger.info(f"Duplicate submission detected from email: {payload.email}")
            return True, "Thanks — we received your project brief.", str(existing.id), 200

        # Persist to database (Primary requirement)
        submission = ContactRepository.create(
            db=db,
            data=payload,
            ip_hash=ip_hash,
            user_agent=user_agent,
            referrer=referrer,
            is_spam=is_spam,
        )

        # If flagged as spam, do NOT dispatch internal emails or alert client
        if is_spam:
            logger.info(f"Spam submission {submission.id} captured and quarantined.")
            return True, "Thanks — we received your project brief.", str(submission.id), 200

        # Dispatch emails (graceful degradation)
        try:
            EmailService.send_contact_notification(submission)
        except Exception as e:
            logger.error(f"Notification email error for {submission.id}: {e}")

        try:
            EmailService.send_contact_acknowledgement(submission)
        except Exception as e:
            logger.error(f"Acknowledgement email error for {submission.id}: {e}")

        return True, "Thanks — we received your project brief.", str(submission.id), 200

    @classmethod
    def process_quote_request(
        cls,
        db: Session,
        payload: QuoteCreate,
        ip_hash: Optional[str],
        user_agent: Optional[str],
        referrer: Optional[str],
    ) -> Tuple[bool, str, Optional[str], int]:
        """
        Processes a 6-step quote estimator request:
        Returns: (success, message, reference_id, http_status_code)
        """
        allowed, reason = SpamService.check_rate_limit(ip_hash)
        if not allowed:
            return False, reason, None, 429

        is_bot = SpamService.is_honeypot_triggered(payload.website_url)
        is_fast = SpamService.is_too_fast(payload.form_start_time)
        is_spam = is_bot or is_fast

        existing = QuoteRepository.find_recent_duplicate(
            db, payload.email, within_seconds=120
        )
        if existing:
            logger.info(f"Duplicate quote request detected from email: {payload.email}")
            return True, "Thanks — we received your project brief.", str(existing.id), 200

        quote = QuoteRepository.create(
            db=db,
            data=payload,
            ip_hash=ip_hash,
            user_agent=user_agent,
            referrer=referrer,
            is_spam=is_spam,
        )

        if is_spam:
            logger.info(f"Spam quote {quote.id} captured and quarantined.")
            return True, "Thanks — we received your project brief.", str(quote.id), 200

        try:
            EmailService.send_quote_notification(quote)
        except Exception as e:
            logger.error(f"Notification email error for quote {quote.id}: {e}")

        try:
            EmailService.send_quote_acknowledgement(quote)
        except Exception as e:
            logger.error(f"Acknowledgement email error for quote {quote.id}: {e}")

        return True, "Thanks — we received your project brief.", str(quote.id), 200
