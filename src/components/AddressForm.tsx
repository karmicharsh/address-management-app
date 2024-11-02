import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaHome, FaBriefcase, FaUsers } from 'react-icons/fa';
import { createAddress, updateAddress } from '../store/LocationSlice';
import { Address } from '../types/address';

interface AddressFormProps {
  location: { lat: number; lng: number };
  onSubmit: () => void;
  editingAddress?: Address | null;
}

const AddressForm: React.FC<AddressFormProps> = ({ location, onSubmit, editingAddress }) => {
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

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        type: editingAddress.type,
        street: editingAddress.street,
        apartment: editingAddress.apartment,
        area: editingAddress.area,
        city: editingAddress.city,
        state: editingAddress.state,
        zipCode: editingAddress.zipCode,
      });
    }
  }, [editingAddress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const addressData = {
      ...formData,
      lat: location.lat,
      lng: location.lng,
    };

    if (editingAddress) {
      await dispatch(updateAddress({
        id: editingAddress.id,
        address: addressData,
      }));
    } else {
      await dispatch(createAddress({
        ...addressData,
        isFavorite: false,
      }));
    }
    onSubmit();
  };

  const typeButtons = [
    { type: 'home', icon: FaHome, label: 'Home' },
    { type: 'office', icon: FaBriefcase, label: 'Office' },
    { type: 'other', icon: FaUsers, label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4 mb-6">
        {typeButtons.map(({ type, icon: Icon, label }) => (
          <motion.button
            key={type}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFormData({ ...formData, type })}
            className={`flex-1 p-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-200
              ${formData.type === type 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
          >
            <Icon className="text-2xl" />
            <span>{label}</span>
          </motion.button>
        ))}
      </div>

      <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <input
          type="text"
          placeholder="Street Address"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          className="input-field"
          required
        />

        <input
          type="text"
          placeholder="Apartment/Suite"
          value={formData.apartment}
          onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
          className="input-field"
        />

        <input
          type="text"
          placeholder="Area"
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          className="input-field"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="input-field"
            required
          />

          <input
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="input-field"
            required
          />
        </div>

        <input
          type="text"
          placeholder="ZIP Code"
          value={formData.zipCode}
          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
          className="input-field"
          required
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full"
        >
          {editingAddress ? 'Update Address' : 'Save Address'}
        </motion.button>
      </motion.div>
    </form>
  );
};

export default AddressForm;