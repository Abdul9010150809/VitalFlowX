const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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

export const ledger = new BlockchainClient();
