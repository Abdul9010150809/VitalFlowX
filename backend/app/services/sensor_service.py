from sqlalchemy.ext.asyncio import AsyncSession
from app.models.sensor_log import SensorLog
from app.models.shipment import Shipment
from app.services.alert_service import create_alert
from typing import Optional


async def log_sensor(db: AsyncSession, shipment_id: int, temperature: Optional[float], humidity: Optional[float], lat: Optional[float], lng: Optional[float]):
    obj = SensorLog(shipment_id=shipment_id, temperature=temperature, humidity=humidity, lat=lat, lng=lng)
    db.add(obj)
    await db.commit()
    await db.refresh(obj)

    # Simple anomaly detection: compare with shipment temp_rules
    shipment = await db.get(Shipment, shipment_id)
    if shipment and shipment.temp_rules and temperature is not None:
        rules = shipment.temp_rules
        mn = rules.get("min")
        mx = rules.get("max")
        if (mn is not None and temperature < mn) or (mx is not None and temperature > mx):
            await create_alert(db, shipment_id, "temp_violation", f"Temperature {temperature} outside rules")

    return obj


async def get_logs(db: AsyncSession, shipment_id: int):
    q = await db.execute(SensorLog.__table__.select().where(SensorLog.shipment_id == shipment_id))
    return q.scalars().all()
