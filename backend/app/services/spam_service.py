import time
from collections import defaultdict
from typing import Dict, List, Tuple
from app.core.config import settings
import logging

logger = logging.getLogger("ignite.spam")


class SpamService:
    """
    Lightweight, multi-layered anti-spam and rate limiting service.
    Works entirely in-memory for single-instance deployments,
    with clean boundaries for shared key-value stores in multi-instance architectures.
    """
    # IP hash -> list of submission timestamps
    _ip_request_history: Dict[str, List[float]] = defaultdict(list)

    @classmethod
    def is_honeypot_triggered(cls, honeypot_value: str | None) -> bool:
        """Returns True if the hidden bot trap field contains any content."""
        if honeypot_value and honeypot_value.strip():
            logger.warning("Spam detected: Honeypot field populated by client.")
            return True
        return False

    @classmethod
    def is_too_fast(cls, form_start_time_ms: float | None) -> bool:
        """
        Returns True if the submission was completed in less than MIN_SUBMISSION_TIME_SECONDS.
        Automated bots typically fill all fields in sub-500ms.
        """
        if not form_start_time_ms:
            return False

        try:
            now_ms = time.time() * 1000
            elapsed_seconds = (now_ms - form_start_time_ms) / 1000.0

            if 0 < elapsed_seconds < settings.MIN_SUBMISSION_TIME_SECONDS:
                logger.warning(f"Suspicious fast submission: elapsed {elapsed_seconds:.2f}s")
                return True
        except Exception:
            pass

        return False

    @classmethod
    def check_rate_limit(cls, ip_hash: str | None) -> Tuple[bool, str]:
        """
        Sliding-window rate limiter per hashed IP.
        Allows up to RATE_LIMIT_PER_10_MINUTES requests within 600 seconds.
        Returns (is_allowed, reason).
        """
        if not ip_hash:
            return True, ""

        now = time.time()
        window_seconds = 600  # 10 minutes
        cutoff = now - window_seconds

        # Prune old timestamps
        cls._ip_request_history[ip_hash] = [
            ts for ts in cls._ip_request_history[ip_hash] if ts > cutoff
        ]

        if len(cls._ip_request_history[ip_hash]) >= settings.RATE_LIMIT_PER_10_MINUTES:
            logger.warning("Rate limit exceeded for hashed client IP.")
            return False, "Rate limit exceeded. Please wait a few minutes before submitting again."

        # Register current attempt
        cls._ip_request_history[ip_hash].append(now)
        return True, ""
