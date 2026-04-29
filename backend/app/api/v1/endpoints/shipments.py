from fastapi import APIRouter, Depends, HTTPException
from app.core.deps import get_db_dep, get_current_actor
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.shipment import ShipmentCreate, ShipmentRead, ShipmentUpdate
from app.services.shipment_service import create_shipment, get_shipment, list_shipments, update_shipment_status
from app.utils.logger import get_logger

router = APIRouter()
logger = get_logger("api.shipments")


@router.post("/shipments")
async def create(payload: ShipmentCreate, db: AsyncSession = Depends(get_db_dep), actor=Depends(get_current_actor)):
    obj = await create_shipment(db, payload, created_by=actor.id)
    return {"success": True, "data": ShipmentRead.from_orm(obj).dict(), "message": "created"}


@router.get("/shipments/{shipment_id}")
async def read(shipment_id: int, db: AsyncSession = Depends(get_db_dep)):
    obj = await get_shipment(db, shipment_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    return {"success": True, "data": ShipmentRead.from_orm(obj).dict(), "message": ""}


@router.get("/shipments")
async def list_all(db: AsyncSession = Depends(get_db_dep)):
    objs = await list_shipments(db)
    return {"success": True, "data": [ShipmentRead.from_orm(o).dict() for o in objs], "message": ""}


@router.patch("/shipments/{shipment_id}/status")
async def patch_status(shipment_id: int, payload: ShipmentUpdate, db: AsyncSession = Depends(get_db_dep)):
    obj = await update_shipment_status(db, shipment_id, payload)
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    return {"success": True, "data": ShipmentRead.from_orm(obj).dict(), "message": "status updated"}
