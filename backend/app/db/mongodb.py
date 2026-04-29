import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

class MockCollection:
    def __init__(self):
        self.data = []
    def find(self, query):
        class Cursor:
            def __init__(self, data):
                self._data = data
            def sort(self, key, direction):
                return self
            def limit(self, num):
                self._data = self._data[:num]
                return self
            async def to_list(self, length=None):
                return self._data
        return Cursor(self.data)
    async def insert_one(self, document):
        document["_id"] = "mock_id_123"
        self.data.append(document)
        return document

class MockDB:
    def __init__(self):
        self.blockchain = MockCollection()
    def __getitem__(self, name):
        return self.blockchain

class MongoDB:
    client = None
    db = None

db = MongoDB()

async def connect_to_mongo():
    try:
        db_url = os.getenv("DATABASE_URL", "mongodb://localhost:27017/vitalflowx")
        # Set a short timeout
        client = AsyncIOMotorClient(db_url, serverSelectionTimeoutMS=2000)
        # Verify connection
        await client.server_info()
        db.client = client
        db.db = client.get_database("vitalflowx")
        print("Connected to MongoDB!")
    except Exception as e:
        print(f"MongoDB connection failed: {e}. Falling back to in-memory MockDB.")
        db.db = MockDB()

async def close_mongo_connection():
    if db.client:
        db.client.close()
        print("Closed MongoDB connection.")
