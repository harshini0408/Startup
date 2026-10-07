from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()


@router.get("/services", response_model=List[Dict[str, Any]])
def list_services():
    """Returns top-level studio capabilities."""
    return [
        {"id": "web", "title": "Web & Digital Experiences"},
        {"id": "saas", "title": "SaaS Product Engineering"},
        {"id": "uiux", "title": "UI/UX & Product Design"},
        {"id": "backend", "title": "Backend & API Engineering"},
        {"id": "ai", "title": "AI Integration"},
        {"id": "agentic", "title": "Agentic AI & Automation"},
        {"id": "data", "title": "Data & Analytics"},
        {"id": "mvp", "title": "MVP Development"},
        {"id": "recommendation", "title": "Recommendation Systems"},
        {"id": "chatbots", "title": "Chatbots"},
    ]
