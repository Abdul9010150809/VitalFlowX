from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_db_dep
from app.schemas.sensor import SensorLogCreate, SensorLogRead
from app.services.sensor_service import log_sensor, get_logs

router = APIRouter()


@router.post("/sensors/log")
async def post_log(payload: SensorLogCreate, db: AsyncSession = Depends(get_db_dep)):
    obj = await log_sensor(db, payload.shipment_id, payload.temperature, payload.humidity, payload.lat, payload.lng)
    return {"success": True, "data": SensorLogRead.from_orm(obj).dict(), "message": "logged"}


@router.get("/sensors/{shipment_id}")
async def get_sensor_logs(shipment_id: int, db: AsyncSession = Depends(get_db_dep)):
    objs = await get_logs(db, shipment_id)
    return {"success": True, "data": [SensorLogRead.from_orm(o).dict() for o in objs], "message": ""}
