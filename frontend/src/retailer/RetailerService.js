import { apiClient } from '../api/apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';

class RetailerService {
  // Get shipments delivered to retailer
  static async getDeliveredShipments() {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}?status=delivered`);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error fetching delivered shipments:', error);
      return [];
    }
  }

  // Get pending shipments (in-transit to retailer)
  static async getPendingShipments() {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}?status=in_transit`);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error fetching pending shipments:', error);
      return [];
    }
  }

  // Confirm receipt of shipment
  static async confirmReceipt(shipmentId, confirmationData = {}) {
    try {
      const response = await apiClient.patch(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/status`, {
        status: 'received_by_retailer',
        receivedAt: new Date().toISOString(),
        receiver: confirmationData.receiver || 'retailer_staff',
        notes: confirmationData.notes,
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error confirming receipt:', error);
      return null;
    }
  }

  // Verify product quality upon receipt
  static async verifyQuality(shipmentId, qualityCheck) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/quality-check`, {
        quality_status: qualityCheck.status, // 'approved' | 'rejected' | 'conditional'
        temperature_ok: qualityCheck.temperature_ok,
        packaging_ok: qualityCheck.packaging_ok,
        expiry_ok: qualityCheck.expiry_ok,
        notes: qualityCheck.notes,
        checked_at: new Date().toISOString(),
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error verifying quality:', error);
      return null;
    }
  }

  // Get product shelf placement zone
  static async getShelfPlacement(shipmentId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/shelf-placement`);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error getting shelf placement:', error);
      return null;
    }
  }

  // Update inventory with received products
  static async updateInventory(shipmentId, inventoryData) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/inventory-update`, {
        items: inventoryData.items,
        location: inventoryData.location,
        updated_at: new Date().toISOString(),
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error updating inventory:', error);
      return null;
    }
  }

  // Scan shipment with QR/barcode
  static async scanShipment(shipmentId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}`);
      if (response.success) {
        return {
          ...response.data,
          scanned_at: new Date().toISOString(),
        };
      }
      return null;
    } catch (error) {
      console.error('Error scanning shipment:', error);
      return null;
    }
  }

  // Get blockchain verification for shipment
  static async getBlockchainVerification(shipmentId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.BLOCKCHAIN}/verify/${shipmentId}`);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error getting blockchain verification:', error);
      return null;
    }
  }

  // Get temperature compliance report
  static async getComplianceReport(shipmentId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SENSORS}?shipment_id=${shipmentId}`);
      if (response.success && response.data) {
        const readings = response.data;
        const tempExceedances = readings.filter(r => 
          r.temperature < 2 || r.temperature > 8
        ).length;
        
        return {
          compliant: tempExceedances === 0,
          total_readings: readings.length,
          exceedances: tempExceedances,
          min_temp: Math.min(...readings.map(r => r.temperature)),
          max_temp: Math.max(...readings.map(r => r.temperature)),
          avg_temp: (readings.reduce((a, r) => a + r.temperature, 0) / readings.length).toFixed(1),
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting compliance report:', error);
      return null;
    }
  }

  // Get delivery proof
  static async getDeliveryProof(shipmentId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/delivery-proof`);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error getting delivery proof:', error);
      return null;
    }
  }

  // Report product rejection/return
  static async reportRejection(shipmentId, rejectionData) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/rejection`, {
        reason: rejectionData.reason,
        description: rejectionData.description,
        images: rejectionData.images,
        created_at: new Date().toISOString(),
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error reporting rejection:', error);
      return null;
    }
  }

  // Get shipment traceability information
  static async getTraceability(shipmentId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/traceability`);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error getting traceability:', error);
      return null;
    }
  }
}

export default RetailerService;
