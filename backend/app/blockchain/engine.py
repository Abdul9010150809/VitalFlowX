import hashlib
import json
from datetime import datetime
from app.db.mongodb import db

class BlockchainEngine:
    def __init__(self):
        self.collection_name = "blockchain"
        self.difficulty = 2

    async def get_chain(self):
        cursor = db.db[self.collection_name].find({}).sort("index", 1)
        chain = await cursor.to_list(length=None)
        # remove _id for json serialization
        for block in chain:
            block["_id"] = str(block["_id"])
        return chain

    async def get_latest_block(self):
        cursor = db.db[self.collection_name].find({}).sort("index", -1).limit(1)
        blocks = await cursor.to_list(length=1)
        return blocks[0] if blocks else None

    def calculate_hash(self, index, previous_hash, timestamp, data, nonce):
        value = str(index) + str(previous_hash) + str(timestamp) + json.dumps(data, sort_keys=True) + str(nonce)
        return hashlib.sha256(value.encode('utf-8')).hexdigest()

    def mine_block(self, index, previous_hash, timestamp, data):
        nonce = 0
        hash_val = self.calculate_hash(index, previous_hash, timestamp, data, nonce)
        while hash_val[:self.difficulty] != "0" * self.difficulty:
            nonce += 1
            hash_val = self.calculate_hash(index, previous_hash, timestamp, data, nonce)
        return hash_val, nonce

    async def create_genesis_block(self):
        existing = await self.get_latest_block()
        if existing:
            return existing

        genesis_block = {
            "index": 0,
            "timestamp": datetime.utcnow().isoformat(),
            "data": {"message": "Genesis Block"},
            "previous_hash": "0",
            "nonce": 0
        }
        genesis_block["hash"] = self.calculate_hash(
            genesis_block["index"],
            genesis_block["previous_hash"],
            genesis_block["timestamp"],
            genesis_block["data"],
            genesis_block["nonce"]
        )
        await db.db[self.collection_name].insert_one(genesis_block)
        return genesis_block

    async def add_transaction(self, data: dict):
        latest_block = await self.get_latest_block()
        if not latest_block:
            latest_block = await self.create_genesis_block()

        new_index = latest_block["index"] + 1
        timestamp = datetime.utcnow().isoformat()
        previous_hash = latest_block["hash"]

        hash_val, nonce = self.mine_block(new_index, previous_hash, timestamp, data)

        new_block = {
            "index": new_index,
            "timestamp": timestamp,
            "data": data,
            "previous_hash": previous_hash,
            "hash": hash_val,
            "nonce": nonce
        }
        await db.db[self.collection_name].insert_one(new_block)
        new_block["_id"] = str(new_block["_id"])
        return new_block

    async def is_chain_valid(self):
        chain = await self.get_chain()
        for i in range(1, len(chain)):
            current = chain[i]
            previous = chain[i - 1]

            if current["hash"] != self.calculate_hash(
                current["index"], current["previous_hash"], current["timestamp"], current["data"], current["nonce"]
            ):
                return False

            if current["previous_hash"] != previous["hash"]:
                return False
        return True

engine = BlockchainEngine()
