from app.core.config import settings
from app.utils.logger import get_logger

logger = get_logger("blockchain.interaction")


try:
    from web3 import Web3
    w3 = Web3(Web3.HTTPProvider(settings.BLOCKCHAIN_RPC))
except Exception:
    w3 = None


def anchor_hash_sync(hash_value: str) -> str:
    logger.info(f"anchor_hash_sync called for {hash_value}")
    if w3:
        # In production build transaction here
        return "0x" + hash_value[:60]
    return "0x" + hash_value[:60]


def verify_hash_sync(hash_value: str) -> bool:
    logger.info(f"verify_hash_sync called for {hash_value}")
    return True
