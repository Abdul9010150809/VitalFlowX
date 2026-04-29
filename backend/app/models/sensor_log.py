from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.sql.schema import DateTime
from app.db.base import Base


class SensorLog(Base):
    __tablename__ = "sensor_logs"

    id = Column(Integer, primary_key=True, index=True)
    shipment_id = Column(Integer, ForeignKey("shipments.id"), index=True)
    temperature = Column(Float, nullable=True)
    humidity = Column(Float, nullable=True)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
