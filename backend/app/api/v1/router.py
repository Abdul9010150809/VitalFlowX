from fastapi import APIRouter
from app.api.v1.endpoints import shipments, events, sensors, documents, alerts

api_router = APIRouter()

api_router.include_router(shipments.router, prefix="/v1", tags=["shipments"]) 
api_router.include_router(events.router, prefix="/v1", tags=["events"]) 
api_router.include_router(sensors.router, prefix="/v1", tags=["sensors"]) 
api_router.include_router(documents.router, prefix="/v1", tags=["documents"]) 
api_router.include_router(alerts.router, prefix="/v1", tags=["alerts"]) 
