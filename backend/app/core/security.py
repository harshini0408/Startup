import hashlib
from app.core.config import settings


def hash_ip(ip: str | None) -> str | None:
    """
    Hashes client IP with a server-side secret salt to protect visitor privacy
    while enabling rate limiting and abuse mitigation without plain IP storage.
    """
    if not ip:
        return None
    salt = settings.IP_HASH_SECRET
    salted = f"{salt}:{ip.strip()}"
    return hashlib.sha256(salted.encode("utf-8")).hexdigest()
