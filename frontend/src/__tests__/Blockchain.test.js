import { describe, it, expect, beforeEach } from 'vitest';
import { Blockchain } from '../utils/blockchain';

describe('Blockchain', () => {
  let testChain;

  beforeEach(() => {
    // Reset localStorage mock if needed, but here we just create a fresh instance
    testChain = new Blockchain();
    testChain.chain = [testChain.createGenesisBlock()]; // Force reset for testing
  });

  it('should start with a genesis block', () => {
    expect(testChain.chain.length).toBe(1);
    expect(testChain.chain[0].data).toBe('Genesis Block');
    expect(testChain.chain[0].index).toBe(0);
  });

  it('should add a new transaction block to the chain', () => {
    const data = { shipment: 'SHP-001', temp: -70 };
    const block = testChain.addTransaction(data);
    
    expect(testChain.chain.length).toBe(2);
    expect(testChain.getLatestBlock().data).toEqual(data);
    expect(block.previousHash).toBe(testChain.chain[0].hash);
  });

  it('should validate a valid chain', () => {
    testChain.addTransaction({ action: 'pickup' });
    testChain.addTransaction({ action: 'delivery' });
    expect(testChain.isChainValid()).toBe(true);
  });

  it('should invalidate a tampered chain (changed data)', () => {
    testChain.addTransaction({ action: 'pickup' });
    
    // Tamper with data
    testChain.chain[1].data = { action: 'stolen' };
    
    expect(testChain.isChainValid()).toBe(false);
  });

  it('should invalidate a tampered chain (broken link)', () => {
    testChain.addTransaction({ action: 'pickup' });
    testChain.addTransaction({ action: 'delivery' });
    
    // Tamper with previous hash link
    testChain.chain[2].previousHash = 'fake_hash';
    
    expect(testChain.isChainValid()).toBe(false);
  });
});
