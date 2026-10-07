from fastapi import Request


def get_client_ip(request: Request) -> str | None:
    """
    Extracts client IP from proxy headers (X-Forwarded-For, X-Real-IP)
    with fallback to client.host.
    """
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        # First IP in comma-separated list is the original client
        return forwarded.split(",")[0].strip()

    real_ip = request.headers.get("x-real-ip")
    if real_ip:
        return real_ip.strip()

    if request.client:
        return request.client.host

    return None


def get_client_user_agent(request: Request) -> str | None:
    """Extracts User-Agent string capped at 500 characters."""
    ua = request.headers.get("user-agent")
    return ua[:500] if ua else None


def get_client_referrer(request: Request) -> str | None:
    """Extracts Referer header capped at 500 characters."""
    ref = request.headers.get("referer")
    return ref[:500] if ref else None
