from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.sql.schema import DateTime
from app.db.base import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    shipment_id = Column(Integer, ForeignKey("shipments.id"), index=True, nullable=True)
    alert_type = Column(String, nullable=False)
    message = Column(String, nullable=False)
    resolved = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
