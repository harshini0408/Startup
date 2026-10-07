import logging
import sys
import time
from typing import Callable
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware


def setup_logging():
    """
    Configures clean, structured logging for the Ignite API service.
    Avoids leaking PII or internal secrets in log outputs.
    """
    log_format = "%(asctime)s | %(levelname)-7s | %(name)s | %(message)s"
    logging.basicConfig(
        level=logging.INFO,
        format=log_format,
        handlers=[logging.StreamHandler(sys.stdout)],
    )
    # Quiet overly chatty libraries
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)


logger = logging.getLogger("ignite.api")


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware that measures request duration and logs route, status, and duration
    without printing request bodies, emails, or PII.
    """
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        start_time = time.time()
        path = request.url.path
        method = request.method

        response = await call_next(request)

        duration_ms = round((time.time() - start_time) * 1000, 2)
        status_code = response.status_code

        # Log clean request summary
        logger.info(f"{method} {path} -> {status_code} ({duration_ms}ms)")

        return response
