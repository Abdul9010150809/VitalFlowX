from app.utils.hash import sha256_bytes
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.document import Document
from app.services.blockchain_service import anchor_hash
from typing import Optional


async def store_document(db: AsyncSession, shipment_id: int, filename: str, content: bytes) -> Document:
    h = sha256_bytes(content)
    # Simulate IPFS pin - in production push to IPFS
    ipfs_hash = f"ipfs://{h}"
    obj = Document(shipment_id=shipment_id, filename=filename, sha256=h, ipfs_hash=ipfs_hash)
    db.add(obj)
    await db.commit()
    await db.refresh(obj)

    # Schedule blockchain anchoring (in background worker)
    tx = await anchor_hash(h)
    obj.tx_hash = tx
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj


async def get_documents_for_shipment(db: AsyncSession, shipment_id: int):
    q = await db.execute(Document.__table__.select().where(Document.shipment_id == shipment_id))
    return q.scalars().all()
