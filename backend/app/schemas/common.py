from typing import Generic, TypeVar, Optional, Dict, Any
from pydantic import BaseModel, Field

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    """
    Standard unified API response model across all Ignite endpoints.
    Ensures frontend receives predictable schema for success and errors.
    """
    success: bool = Field(..., description="Whether the operation succeeded")
    message: str = Field(..., description="Human-readable status summary")
    reference_id: Optional[str] = Field(default=None, description="Inquiry tracking UUID")
    data: Optional[T] = Field(default=None, description="Optional payload")
    errors: Optional[Dict[str, str]] = Field(default=None, description="Field-level validation error mapping")


class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    errors: Optional[Dict[str, str]] = None
