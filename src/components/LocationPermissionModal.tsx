import React from 'react';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Enable Location Services</h2>
        <p className="text-gray-600 mb-6">
          To provide you with the best experience, we need access to your location.
        </p>
        <div className="space-y-3">
          <button
            onClick={onEnableLocation}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaMapMarkerAlt />
            Enable Location
          </button>
          <button
            onClick={onManualSearch}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaSearch />
            Search Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionModal;