from pydantic import BaseModel
from typing import Optional


class AlertRead(BaseModel):
    id: int
    shipment_id: Optional[int]
    alert_type: str
    message: str
    resolved: bool

    class Config:
        orm_mode = True


class AlertResolve(BaseModel):
    resolved: bool = True
