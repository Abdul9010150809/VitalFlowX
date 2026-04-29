from app.workers.celery_app import celery
from app.utils.logger import get_logger

logger = get_logger("workers.tasks")


@celery.task
def anchor_hash_task(hash_value: str):
    logger.info(f"[task] anchor {hash_value}")
    # In production, call blockchain interaction here
    tx = "0x" + hash_value[:60]
    return tx


@celery.task
def process_sensor_task(payload: dict):
    logger.info(f"[task] process sensor payload: {payload}")
    return True
