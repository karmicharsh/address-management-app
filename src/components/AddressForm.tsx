import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaHome, FaBriefcase, FaUsers } from 'react-icons/fa';
import { addAddress } from '../store/LocationSlice';
import { Address } from '../types/address';

interface AddressFormProps {
  location: { lat: number; lng: number };
  onSubmit: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ location, onSubmit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: 'home',
    street: '',
    apartment: '',
    area: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      id: Date.now().toString(),
      ...formData,
      lat: location.lat,
      lng: location.lng,
      isFavorite: false,
    };
    dispatch(addAddress(newAddress));
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => setFormData({ ...formData, type: 'home' })}
          className={`flex-1 p-3 rounded-lg flex flex-col items-center gap-2 ${
            formData.type === 'home' ? 'bg-blue-100 border-blue-500' : 'border'
          }`}
        >
          <FaHome className="text-2xl" />
          <span>Home</span>
        </button>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, type: 'office' })}
          className={`flex-1 p-3 rounded-lg flex flex-col items-center gap-2 ${
            formData.type === 'office' ? 'bg-blue-100 border-blue-500' : 'border'
          }`}
        >
          <FaBriefcase className="text-2xl" />
          <span>Office</span>
        </button>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, type: 'other' })}
          className={`flex-1 p-3 rounded-lg flex flex-col items-center gap-2 ${
            formData.type === 'other' ? 'bg-blue-100 border-blue-500' : 'border'
          }`}
        >
          <FaUsers className="text-2xl" />
          <span>Other</span>
        </button>
      </div>

      <input
        type="text"
        placeholder="Street Address"
        value={formData.street}
        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        className="w-full p-2 border rounded-lg"
        required
      />

      <input
        type="text"
        placeholder="Apartment/Suite"
        value={formData.apartment}
        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
        className="w-full p-2 border rounded-lg"
      />

      <input
        type="text"
        placeholder="Area"
        value={formData.area}
        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
        className="w-full p-2 border rounded-lg"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          type="text"
          placeholder="State"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <input
        type="text"
        placeholder="ZIP Code"
        value={formData.zipCode}
        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
        className="w-full p-2 border rounded-lg"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Address
      </button>
    </form>
  );
};

export default AddressForm;