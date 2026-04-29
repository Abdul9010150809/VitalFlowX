const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  calculateHash(index, previousHash, timestamp, data) {
    const payload = `${index}|${previousHash}|${timestamp}|${JSON.stringify(data)}`;
    let hash = 0;
    for (let i = 0; i < payload.length; i += 1) {
      hash = (hash << 5) - hash + payload.charCodeAt(i);
      hash |= 0;
    }
    return `hash-${Math.abs(hash)}`;
  }

  createGenesisBlock() {
    const index = 0;
    const previousHash = '0';
    const timestamp = 0;
    const data = 'Genesis Block';
    return {
      index,
      previousHash,
      timestamp,
      data,
      hash: this.calculateHash(index, previousHash, timestamp, data),
    };
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(data) {
    const previousBlock = this.getLatestBlock();
    const index = this.chain.length;
    const timestamp = Date.now();
    const block = {
      index,
      previousHash: previousBlock.hash,
      timestamp,
      data,
      hash: this.calculateHash(index, previousBlock.hash, timestamp, data),
    };
    this.chain.push(block);
    return block;
  }

  isChainValid() {
    for (let index = 1; index < this.chain.length; index += 1) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];

      if (currentBlock.hash !== this.calculateHash(currentBlock.index, currentBlock.previousHash, currentBlock.timestamp, currentBlock.data)) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

class BlockchainClient {
  constructor() {
    this.chain = [];
  }

  async getChain() {
    try {
      const response = await fetch(`${API_URL}/api/v1/blockchain/chain`);
      if (!response.ok) throw new Error("Failed to fetch chain");
      const data = await response.json();
      this.chain = data.chain;
      return this.chain;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async addTransaction(data) {
    try {
      const response = await fetch(`${API_URL}/api/v1/blockchain/transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
      if (!response.ok) throw new Error("Failed to add transaction");
      const resData = await response.json();
      return resData.block;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async isChainValid() {
    try {
      const response = await fetch(`${API_URL}/api/v1/blockchain/verify`);
      if (!response.ok) throw new Error("Failed to verify chain");
      const data = await response.json();
      return data.is_valid;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export { Blockchain };
export const ledger = new BlockchainClient();
