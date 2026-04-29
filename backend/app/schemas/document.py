from pydantic import BaseModel
from typing import Optional


class DocumentCreate(BaseModel):
    shipment_id: int


class DocumentRead(BaseModel):
    id: int
    shipment_id: int
    filename: str
    sha256: str
    ipfs_hash: Optional[str]
    tx_hash: Optional[str]

    class Config:
        orm_mode = True
