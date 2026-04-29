from pydantic import BaseModel
from typing import Optional, Any, List


class ShipmentCreate(BaseModel):
    product_details: dict
    origin: str
    destination: str
    route_plan: Optional[dict]
    temp_rules: Optional[dict]


class ShipmentRead(BaseModel):
    id: int
    product_details: dict
    origin: str
    destination: str
    route_plan: Optional[dict]
    temp_rules: Optional[dict]
    blockchain_hash: Optional[str]
    tx_hash: Optional[str]
    status: str

    class Config:
        orm_mode = True


class ShipmentUpdate(BaseModel):
    status: Optional[str]
