from sqlalchemy.ext.asyncio import AsyncSession
from app.models.alert import Alert
from typing import Optional, List


async def create_alert(db: AsyncSession, shipment_id: Optional[int], alert_type: str, message: str) -> Alert:
    obj = Alert(shipment_id=shipment_id, alert_type=alert_type, message=message)
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj


async def list_alerts(db: AsyncSession, limit: int = 100) -> List[Alert]:
    q = await db.execute(Alert.__table__.select().limit(limit))
    return q.scalars().all()


async def resolve_alert(db: AsyncSession, alert_id: int):
    obj = await db.get(Alert, alert_id)
    if not obj:
        return None
    obj.resolved = True
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj
