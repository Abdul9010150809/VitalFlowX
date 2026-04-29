import { apiClient } from '../api/apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';

class TransporterService {
  // Get shipments assigned to transporter
  static async getAssignedShipments() {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}?role=transporter`);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error fetching assigned shipments:', error);
      return [];
    }
  }

  // Get single shipment details
  static async getShipmentDetails(shipmentId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}`);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error fetching shipment details:', error);
      return null;
    }
  }

  // Update current location for tracking
  static async updateLocation(shipmentId, latitude, longitude, temperature = null) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/location`, {
        latitude,
        longitude,
        timestamp: new Date().toISOString(),
        temperature,
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error updating location:', error);
      return null;
    }
  }

  // Acknowledge pickup of shipment
  static async acknowledgePickup(shipmentId) {
    try {
      const response = await apiClient.patch(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/status`, {
        status: 'in_transit',
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error acknowledging pickup:', error);
      return null;
    }
  }

  // Report delivery
  static async reportDelivery(shipmentId, signature = null, notes = null) {
    try {
      const response = await apiClient.patch(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/status`, {
        status: 'delivered',
        deliveryNotes: notes,
        signature,
        deliveredAt: new Date().toISOString(),
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error reporting delivery:', error);
      return null;
    }
  }

  // Get shipment route/tracking history
  static async getTrackingHistory(shipmentId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SHIPMENTS}/${shipmentId}/tracking`);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error fetching tracking history:', error);
      return [];
    }
  }

  // Get sensor data for shipment (temperature, humidity, etc.)
  static async getSensorData(shipmentId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SENSORS}?shipment_id=${shipmentId}`);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      return [];
    }
  }

  // Report issue during transit
  static async reportIssue(shipmentId, issueType, description) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.ALERTS}`, {
        shipment_id: shipmentId,
        alert_type: issueType,
        description,
        severity: 'high',
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error reporting issue:', error);
      return null;
    }
  }

  // Get route optimization suggestions
  static async optimizeRoute(originLat, originLng, destLat, destLng) {
    try {
      const response = await apiClient.post('/api/v1/route/optimize', {
        origin: { lat: originLat, lng: originLng },
        destination: { lat: destLat, lng: destLng },
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error optimizing route:', error);
      return null;
    }
  }

  // Calculate ETA to destination
  static calculateETA(currentLat, currentLng, destLat, destLng, speed = 60) {
    // Simple distance calculation using haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = (destLat - currentLat) * (Math.PI / 180);
    const dLng = (destLng - currentLng) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(currentLat * (Math.PI / 180)) * Math.cos(destLat * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // Calculate time needed
    const hours = distance / speed;
    const now = new Date();
    return {
      distance: distance.toFixed(2),
      time: hours,
      eta: new Date(now.getTime() + hours * 60 * 60 * 1000),
    };
  }
}

export default TransporterService;
