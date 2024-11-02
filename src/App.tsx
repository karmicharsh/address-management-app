import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from './store';
import {
  setCurrentLocation,
  setSelectedLocation,
  setError,
  fetchAddresses,
} from './store/LocationSlice';
import LocationPermissionModal from './components/LocationPermissionModal';
import Map from './components/Map';
import AddressForm from './components/AddressForm';
import AddressList from './components/AddressList';
import ThemeToggle from './components/ThemeToggle';
import { Address } from './types/address';
import { FaPlus, FaSpinner } from 'react-icons/fa';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const { selectedLocation, error, loading } = useSelector(
    (state: RootState) => state.location
  );

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleLocationEnable = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          dispatch(setCurrentLocation(location));
          setShowPermissionModal(false);
        },
        () => {
          dispatch(setError('Unable to retrieve your location'));
        }
      );
    } else {
      dispatch(setError('Geolocation is not supported by your browser'));
    }
  };

  const handleManualSearch = () => {
    const defaultLocation = {
      lat: 40.7128,
      lng: -74.0060,
    };
    dispatch(setSelectedLocation(defaultLocation));
    setShowPermissionModal(false);
  };

  const handleMarkerDragEnd = (lat: number, lng: number) => {
    dispatch(setSelectedLocation({ lat, lng }));
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <AnimatePresence>
        {showPermissionModal && (
          <LocationPermissionModal
            onEnableLocation={handleLocationEnable}
            onManualSearch={handleManualSearch}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Address Management
          </motion.h1>
          <ThemeToggle />
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4"
          >
            {error}
          </motion.div>
        )}

        {selectedLocation && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 transition-colors duration-200"
          >
            <Map center={selectedLocation} onMarkerDragEnd={handleMarkerDragEnd} />
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddressForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg mb-6 hover:shadow-lg transition-shadow"
        >
          <FaPlus /> Add New Address
        </motion.button>

        <AnimatePresence>
          {showAddressForm && selectedLocation && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 transition-colors duration-200"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h2>
              <AddressForm
                location={selectedLocation}
                onSubmit={() => setShowAddressForm(false)}
                editingAddress={editingAddress}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <FaSpinner className="animate-spin text-3xl text-blue-600" />
          </div>
        ) : (
          <AddressList onEdit={handleEditAddress} />
        )}
      </div>
    </div>
  );
};

export default App;