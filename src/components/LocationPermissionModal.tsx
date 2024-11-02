import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

interface LocationPermissionModalProps {
  onEnableLocation: () => void;
  onManualSearch: () => void;
}

const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
  onEnableLocation,
  onManualSearch,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          Enable Location Services
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          To provide you with the best experience, we need access to your location.
        </p>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEnableLocation}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-shadow"
          >
            <FaMapMarkerAlt />
            Enable Location
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onManualSearch}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
          >
            <FaSearch />
            Search Manually
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LocationPermissionModal;