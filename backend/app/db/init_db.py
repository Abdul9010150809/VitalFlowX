import asyncio
from app.db.session import engine
from app.db.base import Base
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.models.actor import Actor
from app.models.shipment import Shipment
from app.models.sensor_log import SensorLog
from app.models.alert import Alert
from app.core.security import hash_password


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
    async with AsyncSessionLocal() as db:
        # create actors
        roles = ["producer", "transporter", "warehouse", "retailer", "inspector", "regulator"]
        actors = []
        for i, r in enumerate(roles, start=1):
            a = Actor(name=f"User{i}", role=r, email=f"{r}@example.com", hashed_password=hash_password("pass"))
            db.add(a)
            actors.append(a)
        await db.commit()
        for a in actors:
            await db.refresh(a)

        # create shipments
        s1 = Shipment(product_details={"name": "Vaccine A", "qty": 100}, origin="Farm A", destination="Clinic 1", temp_rules={"min": 2, "max": 8}, status="in_transit", created_by_id=actors[0].id)
        s2 = Shipment(product_details={"name": "Serum B", "qty": 50}, origin="Factory X", destination="Warehouse Y", temp_rules={"min": 1, "max": 10}, status="created", created_by_id=actors[0].id)
        db.add_all([s1, s2])
        await db.commit()
        await db.refresh(s1)
        await db.refresh(s2)

        # sensor logs
        log = SensorLog(shipment_id=s1.id, temperature=9.5, humidity=60.0)
        db.add(log)
        await db.commit()

        # alert scenario
        alert = Alert(shipment_id=s1.id, alert_type="temp_violation", message="Temperature exceeded max limit")
        db.add(alert)
        await db.commit()

    print("Seeded sample data")


if __name__ == "__main__":
    asyncio.run(seed())
