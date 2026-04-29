from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.shipment import Shipment
from app.schemas.shipment import ShipmentCreate, ShipmentUpdate


async def create_shipment(db: AsyncSession, payload: ShipmentCreate, created_by: Optional[int] = None) -> Shipment:
    obj = Shipment(
        product_details=payload.product_details,
        origin=payload.origin,
        destination=payload.destination,
        route_plan=payload.route_plan,
        temp_rules=payload.temp_rules,
        created_by_id=created_by,
    )
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj


async def get_shipment(db: AsyncSession, shipment_id: int) -> Optional[Shipment]:
    return await db.get(Shipment, shipment_id)


async def list_shipments(db: AsyncSession, limit: int = 100) -> List[Shipment]:
    q = await db.execute(Shipment.__table__.select().limit(limit))
    return q.scalars().all()


async def update_shipment_status(db: AsyncSession, shipment_id: int, payload: ShipmentUpdate) -> Optional[Shipment]:
    obj = await db.get(Shipment, shipment_id)
    if not obj:
        return None
    if payload.status:
        obj.status = payload.status
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj
