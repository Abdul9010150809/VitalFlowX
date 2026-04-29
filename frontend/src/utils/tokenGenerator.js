import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

export class TokenGenerator {
  /**
   * Generates a unique secure tracking token for a shipment
   */
  static generateTrackingToken(product, origin) {
    const rawData = `${product}-${origin}-${Date.now()}-${uuidv4()}`;
    const hash = CryptoJS.SHA256(rawData).toString(CryptoJS.enc.Hex);
    return `VTX-${hash.substring(0, 16).toUpperCase()}`;
  }

  /**
   * Generates a deterministic QR payload object
   */
  static generateQRPayload(trackingToken, metadata) {
    return JSON.stringify({
      ver: '1.0',
      token: trackingToken,
      meta: metadata,
      timestamp: Date.now()
    });
  }
}
