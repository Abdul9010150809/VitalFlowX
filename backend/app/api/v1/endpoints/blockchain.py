from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Any, Dict
from app.blockchain.engine import engine

router = APIRouter()

class TransactionModel(BaseModel):
    data: Dict[str, Any]

@router.get("/chain")
async def get_chain():
    chain = await engine.get_chain()
    return {"chain": chain, "length": len(chain)}

@router.post("/transaction")
async def add_transaction(tx: TransactionModel):
    try:
        new_block = await engine.add_transaction(tx.data)
        return {"message": "Transaction added to block", "block": new_block}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/verify")
async def verify_chain():
    is_valid = await engine.is_chain_valid()
    return {"is_valid": is_valid}
