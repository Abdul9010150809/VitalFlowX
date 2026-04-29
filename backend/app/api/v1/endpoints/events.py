from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_db_dep, get_current_actor
from app.schemas.event import EventCreate, EventRead
from app.models.event import Event

router = APIRouter()


@router.post("/events")
async def create_event(payload: EventCreate, db: AsyncSession = Depends(get_db_dep), actor=Depends(get_current_actor)):
    obj = Event(
        shipment_id=payload.shipment_id,
        event_type=payload.event_type,
        geo=payload.geo,
        actor_id=payload.actor_id or actor.id,
        proof_hash=payload.proof_hash,
    )
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return {"success": True, "data": EventRead.from_orm(obj).dict(), "message": "event created"}


@router.get("/events/{shipment_id}")
async def get_events(shipment_id: int, db: AsyncSession = Depends(get_db_dep)):
    q = await db.execute(Event.__table__.select().where(Event.shipment_id == shipment_id))
    objs = q.scalars().all()
    return {"success": True, "data": [EventRead.from_orm(o).dict() for o in objs], "message": ""}
