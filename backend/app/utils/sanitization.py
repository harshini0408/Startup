import re


def clean_text(val: str | None) -> str | None:
    """
    Sanitizes plain text input by stripping dangerous control characters,
    null bytes, and excess surrounding whitespace.
    """
    if val is None:
        return None
    # Remove null bytes and non-printable control characters (except newline, tab, carriage return)
    cleaned = re.sub(r"[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]", "", val)
    return cleaned.strip()


def normalize_email(email: str) -> str:
    """
    Normalizes email addresses to prevent casing bypasses and trim spaces.
    """
    cleaned = clean_text(email) or ""
    return cleaned.lower()
