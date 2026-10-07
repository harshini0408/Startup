from fastapi import APIRouter
from app.api.routes import health, contact, quote, projects, services, articles

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(contact.router, tags=["Contact"])
api_router.include_router(quote.router, tags=["Quote"])
api_router.include_router(projects.router, tags=["Projects"])
api_router.include_router(services.router, tags=["Services"])
api_router.include_router(articles.router, tags=["Articles"])
