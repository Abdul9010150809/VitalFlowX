import { apiClient } from '../api/apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';

class WarehouseService {
  // Get incoming shipments for warehouse
  static async getIncomingShipments() {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}?status=in_transit`);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error fetching incoming shipments:', error);
      return [];
    }
  }

  // Get received shipments
  static async getReceivedShipments() {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}?status=received`);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error fetching received shipments:', error);
      return [];
    }
  }

  // Accept/receive shipment
  static async receiveShipment(shipmentId, receivedData = {}) {
    try {
      const response = await apiClient.patch(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/status`, {
        status: 'received',
        receivedAt: new Date().toISOString(),
        receivedBy: receivedData.receivedBy || 'warehouse_staff',
        notes: receivedData.notes,
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error receiving shipment:', error);
      return null;
    }
  }

  // Get storage zone assignment for shipment
  static async assignStorageZone(shipmentId, zoneId) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/storage-zone`, {
        zone_id: zoneId,
        assigned_at: new Date().toISOString(),
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error assigning storage zone:', error);
      return null;
    }
  }

  // Get sensor readings for storage zone
  static async getZoneSensorData(zoneId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SENSORS}?zone_id=${zoneId}`);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error fetching zone sensor data:', error);
      return [];
    }
  }

  // Monitor temperature and humidity in storage
  static async monitorEnvironment(shipmentId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SENSORS}?shipment_id=${shipmentId}`);
      if (response.success && response.data) {
        return {
          temperature: response.data[0]?.temperature || null,
          humidity: response.data[0]?.humidity || null,
          status: 'compliant',
          readings: response.data,
        };
      }
      return null;
    } catch (error) {
      console.error('Error monitoring environment:', error);
      return null;
    }
  }

  // Verify shipment contents
  static async verifyContents(shipmentId, items) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/verify`, {
        items,
        verified_at: new Date().toISOString(),
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error verifying contents:', error);
      return null;
    }
  }

  // Start storage period
  static async startStorage(shipmentId, storageDetails) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/storage-start`, {
        zone_id: storageDetails.zone_id,
        start_date: new Date().toISOString(),
        expected_duration: storageDetails.expected_duration,
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error starting storage:', error);
      return null;
    }
  }

  // End storage and prepare for shipment
  static async endStorage(shipmentId) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/storage-end`, {
        end_date: new Date().toISOString(),
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error ending storage:', error);
      return null;
    }
  }

  // Get alerts for warehouse shipments
  static async getAlerts() {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ALERTS}?role=warehouse`);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return [];
    }
  }

  // Report quality issue
  static async reportQualityIssue(shipmentId, issue) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.ALERTS}`, {
        shipment_id: shipmentId,
        alert_type: 'quality_issue',
        description: issue.description,
        severity: issue.severity || 'medium',
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error reporting quality issue:', error);
      return null;
    }
  }

  // Get shipment history
  static async getShipmentHistory(shipmentId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/tracking`);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error fetching shipment history:', error);
      return [];
    }
  }
}

export default WarehouseService;
