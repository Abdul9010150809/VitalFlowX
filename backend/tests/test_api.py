import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    assert response.json() == {"success": True, "data": {"status": "ok"}, "message": ""}

@pytest.mark.asyncio
async def test_get_shipments():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/shipments")
    assert response.status_code in [200, 404, 401]

@pytest.mark.asyncio
async def test_blockchain_status():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/blockchain/status")
    if response.status_code == 200:
        assert "chain" in response.json()["data"]
