from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.db.base import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    shipment_id = Column(Integer, ForeignKey("shipments.id"), index=True)
    filename = Column(String, nullable=False)
    sha256 = Column(String, nullable=False, index=True)
    ipfs_hash = Column(String, nullable=True)
    tx_hash = Column(String, nullable=True)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
