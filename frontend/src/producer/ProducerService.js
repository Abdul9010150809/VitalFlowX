/**
 * Producer Feature Service
 * Handles all API calls for producer features
 */

import { apiClient } from '../api/apiClient';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config/apiConfig';

class ProducerService {
  /**
   * Get all shipments
   */
  static async getShipments(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `${API_ENDPOINTS.SHIPMENTS.LIST}${queryParams ? `?${queryParams}` : ''}`;
      return await apiClient.get(endpoint);
    } catch (error) {
      console.error('Error fetching shipments:', error);
      throw error;
    }
  }

  /**
   * Create a shipment
   */
  static async createShipment(data) {
    try {
      return await apiClient.post(API_ENDPOINTS.SHIPMENTS.CREATE, data);
    } catch (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }
  }

  /**
   * Update shipment
   */
  static async updateShipment(id, data) {
    try {
      return await apiClient.put(API_ENDPOINTS.SHIPMENTS.UPDATE(id), data);
    } catch (error) {
      console.error('Error updating shipment:', error);
      throw error;
    }
  }

  /**
   * Get shipment by ID
   */
  static async getShipment(id) {
    try {
      return await apiClient.get(API_ENDPOINTS.SHIPMENTS.GET(id));
    } catch (error) {
      console.error('Error fetching shipment:', error);
      throw error;
    }
  }

  /**
   * Bind sensors to shipment
   */
  static async bindSensors(shipmentId, sensorIds) {
    try {
      return await apiClient.post(`/api/v1/shipments/${shipmentId}/sensors/bind`, {
        sensor_ids: sensorIds,
      });
    } catch (error) {
      console.error('Error binding sensors:', error);
      throw error;
    }
  }

  /**
   * Upload documents
   */
  static async uploadDocuments(shipmentId, documents) {
    try {
      const formData = new FormData();
      formData.append('shipment_id', shipmentId);
      documents.forEach((doc) => {
        formData.append(`files`, doc);
      });

      const endpoint = `${API_ENDPOINTS.DOCUMENTS.UPLOAD}`;
      const response = await fetch(`${apiClient.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to upload documents');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading documents:', error);
      throw error;
    }
  }

  /**
   * Register on blockchain
   */
  static async registerOnBlockchain(shipmentData) {
    try {
      return await apiClient.post(`${API_ENDPOINTS.BLOCKCHAIN.DEPLOY}`, shipmentData);
    } catch (error) {
      console.error('Error registering on blockchain:', error);
      throw error;
    }
  }

  /**
   * Get alerts
   */
  static async getAlerts(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `${API_ENDPOINTS.ALERTS.LIST}${queryParams ? `?${queryParams}` : ''}`;
      return await apiClient.get(endpoint);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      throw error;
    }
  }

  /**
   * Acknowledge alert
   */
  static async acknowledgeAlert(id) {
    try {
      return await apiClient.post(API_ENDPOINTS.ALERTS.ACKNOWLEDGE(id), {});
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      throw error;
    }
  }

  /**
   * Get blockchain ledger
   */
  static async getLedger(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `/api/v1/blockchain/ledger${queryParams ? `?${queryParams}` : ''}`;
      return await apiClient.get(endpoint);
    } catch (error) {
      console.error('Error fetching ledger:', error);
      throw error;
    }
  }

  /**
   * Get sensor data
   */
  static async getSensorData(sensorId) {
    try {
      return await apiClient.get(API_ENDPOINTS.SENSORS.DATA(sensorId));
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      throw error;
    }
  }

  /**
   * Get risk assessment
   */
  static async getRiskAssessment(shipmentId) {
    try {
      return await apiClient.get(`/api/v1/shipments/${shipmentId}/risk-assessment`);
    } catch (error) {
      console.error('Error fetching risk assessment:', error);
      throw error;
    }
  }

  /**
   * Generate QR code
   */
  static async generateQRCode(shipmentId) {
    try {
      return await apiClient.get(`/api/v1/shipments/${shipmentId}/qr-code`);
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw error;
    }
  }

  /**
   * Create exception case
   */
  static async createExceptionCase(data) {
    try {
      return await apiClient.post(`/api/v1/exception-cases`, data);
    } catch (error) {
      console.error('Error creating exception case:', error);
      throw error;
    }
  }

  /**
   * Get events
   */
  static async getEvents(shipmentId) {
    try {
      return await apiClient.get(`/api/v1/shipments/${shipmentId}/events`);
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }
}

export default ProducerService;
