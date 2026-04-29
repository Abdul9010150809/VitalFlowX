from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SensorLogCreate(BaseModel):
    shipment_id: int
    temperature: Optional[float]
    humidity: Optional[float]
    lat: Optional[float]
    lng: Optional[float]


class SensorLogRead(BaseModel):
    id: int
    shipment_id: int
    temperature: Optional[float]
    humidity: Optional[float]
    lat: Optional[float]
    lng: Optional[float]
    recorded_at: datetime

    class Config:
        orm_mode = True
