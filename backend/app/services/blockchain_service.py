from app.core.config import settings
from app.utils.logger import get_logger

logger = get_logger("blockchain")


async def anchor_hash(hash_value: str) -> str:
    """Stub: anchor a hash to the blockchain and return tx_hash."""
    # In production, schedule this on a worker that talks to Web3 and submits a tx.
    logger.info(f"Anchoring hash {hash_value} to blockchain (stub)")
    fake_tx = "0x" + (hash_value[:60] if hash_value else "deadbeef")
    return fake_tx


async def verify_hash(hash_value: str) -> bool:
    logger.info(f"Verifying hash {hash_value} (stub)")
    # In real implementation, query on-chain records
    return True
