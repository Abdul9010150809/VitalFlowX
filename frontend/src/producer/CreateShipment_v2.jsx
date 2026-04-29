import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAsync } from '../hooks/useCustom';
import { Spinner, LoadingOverlay } from '../components/Loading';
import ProducerService from './ProducerService';

const CreateShipment = () => {
  const { success, error: showError } = useToast();
  const [formData, setFormData] = useState({
    product: '',
    batchNumber: '',
    quantity: '',
    origin: '',
    destination: '',
    temperature: '',
    manufacturer: '',
  });
  const [errors, setErrors] = useState({});

  const { execute: createShipment, status } = useAsync(
    () => ProducerService.createShipment(formData),
    false
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formData.product) newErrors.product = 'Product is required';
    if (!formData.batchNumber) newErrors.batchNumber = 'Batch number is required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Valid quantity required';
    if (!formData.origin) newErrors.origin = 'Origin is required';
    if (!formData.destination) newErrors.destination = 'Destination is required';
    if (!formData.temperature) newErrors.temperature = 'Temperature is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createShipment();
        success('Shipment created successfully!');
        setFormData({
          product: '',
          batchNumber: '',
          quantity: '',
          origin: '',
          destination: '',
          temperature: '',
          manufacturer: '',
        });
      } catch (err) {
        showError(err.message || 'Failed to create shipment');
      }
    }
  };

  const isLoading = status === 'pending';

  return (
    <div className="space-y-6">
      <LoadingOverlay isLoading={isLoading} message="Creating shipment..." />
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Shipment</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="e.g., Pfizer BNT162b2"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.product ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.product && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.product}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number *</label>
              <input
                type="text"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleChange}
                placeholder="e.g., BATCH-2024-001"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.batchNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.batchNumber && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.batchNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="5000"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.quantity}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Storage Temperature *</label>
              <input
                type="text"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="e.g., -70°C to -65°C"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.temperature ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.temperature && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.temperature}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Origin Location *</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="e.g., Kalamazoo, MI"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.origin ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.origin && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.origin}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination Location *</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g., NYC Hub, NY"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.destination ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.destination && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.destination}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                placeholder="e.g., Pfizer Inc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {isLoading ? <><Spinner size="sm" /> Creating...</> : <><Plus className="w-5 h-5" /> Create Shipment</>}
            </button>
            <button
              type="button"
              onClick={() => setFormData({ product: '', batchNumber: '', quantity: '', origin: '', destination: '', temperature: '', manufacturer: '' })}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShipment;
