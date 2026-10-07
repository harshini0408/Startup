from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()


@router.get("/articles", response_model=List[Dict[str, Any]])
def list_articles():
    """Returns insights and architectural essays."""
    return [
        {
            "id": "1",
            "slug": "agentic-state-machines",
            "title": "Architecting Deterministic State in Agentic AI Systems",
            "published_at": "2025-10-14",
        },
        {
            "id": "2",
            "slug": "high-performance-webgl",
            "title": "GPU Shader Pipelines for High-Frequency Spatial Data",
            "published_at": "2025-09-28",
        },
    ]
