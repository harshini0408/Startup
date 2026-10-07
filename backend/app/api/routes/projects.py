from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()


@router.get("/projects", response_model=List[Dict[str, Any]])
def list_projects():
    """
    Optional projects endpoint.
    Frontend currently manages rich WebGL / image assets client-side.
    """
    return [
        {
            "id": "kairos",
            "slug": "kairos-fleet",
            "title": "Kairos Autonomous Fleet",
            "category": "Autonomous Dispatch Engine",
            "project_type": "Studio Prototype",
        },
        {
            "id": "aether",
            "slug": "spatial-architect",
            "title": "Spatial Architect",
            "category": "Real-Time Spatial Analytics",
            "project_type": "Studio Exploration",
        },
        {
            "id": "verve",
            "slug": "stratum-journal",
            "title": "Stratum Editorial & Objects",
            "category": "Editorial Commerce Platform",
            "project_type": "Product Exploration",
        },
        {
            "id": "orbit",
            "slug": "axion-core",
            "title": "Axion Agentic Core",
            "category": "Agentic Workflow Orchestrator",
            "project_type": "Studio Prototype",
        },
    ]
