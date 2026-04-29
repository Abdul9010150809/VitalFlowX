from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.sql.schema import DateTime
from sqlalchemy import JSON
from app.db.base import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    shipment_id = Column(Integer, ForeignKey("shipments.id"), index=True)
    event_type = Column(String, nullable=False)
    geo = Column(JSON, nullable=True)
    actor_id = Column(Integer, ForeignKey("actors.id"), nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    proof_hash = Column(String, nullable=True)
