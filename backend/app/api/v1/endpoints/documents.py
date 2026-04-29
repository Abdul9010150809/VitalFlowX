from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_db_dep
from app.services.document_service import store_document, get_documents_for_shipment

router = APIRouter()


@router.post("/documents/upload")
async def upload_document(shipment_id: int, file: UploadFile = File(...), db: AsyncSession = Depends(get_db_dep)):
    content = await file.read()
    obj = await store_document(db, shipment_id, file.filename, content)
    return {"success": True, "data": {"id": obj.id, "sha256": obj.sha256, "ipfs": obj.ipfs_hash}, "message": "uploaded"}


@router.get("/documents/{shipment_id}")
async def list_documents(shipment_id: int, db: AsyncSession = Depends(get_db_dep)):
    objs = await get_documents_for_shipment(db, shipment_id)
    return {"success": True, "data": [dict(id=o.id, filename=o.filename, sha256=o.sha256, ipfs=o.ipfs_hash) for o in objs], "message": ""}


@router.post("/documents/verify")
async def verify_document(sha256: str):
    # For demo, always return True (in production use blockchain verify)
    return {"success": True, "data": {"verified": True}, "message": ""}
