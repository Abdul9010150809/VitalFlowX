from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from app.db.base import Base


class ExceptionCase(Base):
    __tablename__ = "exception_cases"

    id = Column(Integer, primary_key=True, index=True)
    shipment_id = Column(Integer, ForeignKey("shipments.id"), index=True)
    description = Column(String, nullable=False)
    status = Column(String, default="open")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
