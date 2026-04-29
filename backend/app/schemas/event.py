from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class EventCreate(BaseModel):
    shipment_id: int
    event_type: str
    geo: Optional[dict]
    actor_id: Optional[int]
    proof_hash: Optional[str]


class EventRead(BaseModel):
    id: int
    shipment_id: int
    event_type: str
    geo: Optional[dict]
    actor_id: Optional[int]
    timestamp: datetime
    proof_hash: Optional[str]

    class Config:
        orm_mode = True
