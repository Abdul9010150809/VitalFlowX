/**
 * API Configuration and Constants
 * Centralized API endpoints and configuration for all frontend requests
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_VERSION = import.meta.env.VITE_API_BASE_PATH || '/api/v1';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  apiVersion: API_VERSION,
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_VERSION}/auth/login`,
    LOGOUT: `${API_VERSION}/auth/logout`,
    REFRESH: `${API_VERSION}/auth/refresh`,
    REGISTER: `${API_VERSION}/auth/register`,
  },

  // Shipments
  SHIPMENTS: {
    LIST: `${API_VERSION}/shipments`,
    CREATE: `${API_VERSION}/shipments`,
    GET: (id) => `${API_VERSION}/shipments/${id}`,
    UPDATE: (id) => `${API_VERSION}/shipments/${id}`,
    DELETE: (id) => `${API_VERSION}/shipments/${id}`,
  },

  // Sensors
  SENSORS: {
    LIST: `${API_VERSION}/sensors`,
    CREATE: `${API_VERSION}/sensors`,
    GET: (id) => `${API_VERSION}/sensors/${id}`,
    UPDATE: (id) => `${API_VERSION}/sensors/${id}`,
    DATA: (id) => `${API_VERSION}/sensors/${id}/data`,
  },

  // Alerts
  ALERTS: {
    LIST: `${API_VERSION}/alerts`,
    CREATE: `${API_VERSION}/alerts`,
    GET: (id) => `${API_VERSION}/alerts/${id}`,
    ACKNOWLEDGE: (id) => `${API_VERSION}/alerts/${id}/acknowledge`,
  },

  // Documents
  DOCUMENTS: {
    LIST: `${API_VERSION}/documents`,
    UPLOAD: `${API_VERSION}/documents/upload`,
    GET: (id) => `${API_VERSION}/documents/${id}`,
    VALIDATE: (id) => `${API_VERSION}/documents/${id}/validate`,
  },

  // Events
  EVENTS: {
    LIST: `${API_VERSION}/events`,
    CREATE: `${API_VERSION}/events`,
    GET: (id) => `${API_VERSION}/events/${id}`,
  },

  // User
  USER: {
    PROFILE: `${API_VERSION}/user/profile`,
    UPDATE_PROFILE: `${API_VERSION}/user/profile`,
    CHANGE_PASSWORD: `${API_VERSION}/user/change-password`,
  },

  // Blockchain
  BLOCKCHAIN: {
    VERIFY: `${API_VERSION}/blockchain/verify`,
    DEPLOY: `${API_VERSION}/blockchain/deploy`,
    GET_ADDRESS: `${API_VERSION}/blockchain/address`,
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme_preference',
  SIDEBAR_STATE: 'sidebar_collapsed',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_ERROR: 'Authentication failed. Please login again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'You do not have permission to access this resource.',
  TIMEOUT: 'Request timeout. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  CREATE_SUCCESS: 'Created successfully!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  UPLOAD_SUCCESS: 'Uploaded successfully!',
};

export default API_ENDPOINTS;
