import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.config import settings
from app.core.logging import setup_logging, RequestLoggingMiddleware
from app.api.api import api_router

setup_logging()
logger = logging.getLogger("ignite.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Starting {settings.APP_NAME} in '{settings.APP_ENV}' mode.")
    logger.info(f"Allowed CORS origins: {settings.CORS_ORIGINS}")
    yield
    logger.info(f"Shutting down {settings.APP_NAME}.")


app = FastAPI(
    title=settings.APP_NAME,
    description="Production API backend for Ignite° digital engineering studio.",
    version="1.0.0",
    docs_url="/docs" if settings.enable_docs else None,
    redoc_url="/redoc" if settings.enable_docs else None,
    openapi_url="/openapi.json" if settings.enable_docs else None,
    lifespan=lifespan,
)

# CORS Middleware
origins = settings.CORS_ORIGINS
if isinstance(origins, str):
    origins = [o.strip() for o in origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Structured Request Logging Middleware
app.add_middleware(RequestLoggingMiddleware)


# Clean 422 Validation Error Handler (Matches Ignite frontend expectations)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors: dict[str, str] = {}
    for err in exc.errors():
        field_path = err.get("loc", [])
        field_name = field_path[-1] if field_path else "general"
        msg = err.get("msg", "Invalid input value.")
        if msg.startswith("Value error, "):
            msg = msg.replace("Value error, ", "")
        errors[str(field_name)] = msg

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
        content={
            "success": False,
            "message": "Please review the highlighted fields.",
            "errors": errors,
        },
    )


# Clean 404/HTTP Error Handler
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.detail or "Request error.",
        },
    )


# Safe 500 Server Error Handler (Never leaks internal traces/passwords/paths)
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled server error on {request.method} {request.url.path}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "message": "An unexpected error occurred while processing your request. Please try again later.",
        },
    )


# Mount API routes
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
def root():
    return {
        "service": "ignite-api",
        "status": "online",
        "documentation": "/docs" if settings.enable_docs else "disabled",
    }
