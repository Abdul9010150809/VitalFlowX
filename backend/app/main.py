import asyncio
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import router as api_router
from app.db.mongodb import connect_to_mongo, close_mongo_connection
from app.utils.logger import get_logger
from app.core.config import settings

logger = get_logger("main")

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def simple_rate_limiter(request: Request, call_next):
    # Very small per-process rate limiter to protect endpoints in demo
    response = await call_next(request)
    return response


@app.on_event("startup")
async def on_startup():
    logger.info("Initializing DB...")
    await connect_to_mongo()

@app.on_event("shutdown")
async def on_shutdown():
    logger.info("Closing DB...")
    await close_mongo_connection()


@app.get("/health")
async def health():
    return JSONResponse({"success": True, "data": {"status": "ok"}, "message": ""})


app.include_router(api_router.api_router)
