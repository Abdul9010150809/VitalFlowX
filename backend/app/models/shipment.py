from sqlalchemy import Column, Integer, String, Text, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.sql.schema import DateTime
from app.db.base import Base


class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(Integer, primary_key=True, index=True)
    product_details = Column(JSON, nullable=False)
    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    route_plan = Column(JSON, nullable=True)
    temp_rules = Column(JSON, nullable=True)
    blockchain_hash = Column(String, nullable=True, index=True)
    tx_hash = Column(String, nullable=True)
    status = Column(String, nullable=False, default="created")
    created_by_id = Column(Integer, ForeignKey("actors.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
