from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_db_dep
from app.services.alert_service import list_alerts, resolve_alert
from app.schemas.alert import AlertResolve

router = APIRouter()


@router.get("/alerts")
async def get_alerts(db: AsyncSession = Depends(get_db_dep)):
    objs = await list_alerts(db)
    return {"success": True, "data": [dict(id=o.id, shipment_id=o.shipment_id, alert_type=o.alert_type, message=o.message, resolved=o.resolved) for o in objs], "message": ""}


@router.patch("/alerts/{alert_id}/resolve")
async def resolve(alert_id: int, payload: AlertResolve, db: AsyncSession = Depends(get_db_dep)):
    obj = await resolve_alert(db, alert_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    return {"success": True, "data": {"id": obj.id, "resolved": obj.resolved}, "message": "resolved"}
