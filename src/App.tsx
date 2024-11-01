import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import {
  setCurrentLocation,
  setSelectedLocation,
  setError,
} from './store/LocationSlice';
import LocationPermissionModal from './components/LocationPermissionModal';
import Map from './components/Map';
import AddressForm from './components/AddressForm';
import AddressList from './components/AddressList';
import { Address } from './types/address';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const {  selectedLocation, error } = useSelector(
    (state: RootState) => state.location
  );

  const handleLocationEnable = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          dispatch(setCurrentLocation(location));
          dispatch(setSelectedLocation(location));
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
    // Set a default location (e.g., city center) when manual search is selected
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
    <div className="min-h-screen bg-gray-100">
      {showPermissionModal && (
        <LocationPermissionModal
          onEnableLocation={handleLocationEnable}
          onManualSearch={handleManualSearch}
        />
      )}

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Address Management</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {selectedLocation && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <Map center={selectedLocation} onMarkerDragEnd={handleMarkerDragEnd} />
          </div>
        )}

        <button
          onClick={() => setShowAddressForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-6"
        >
          Add New Address
        </button>

        {showAddressForm && selectedLocation && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h2>
            <AddressForm
              location={selectedLocation}
              onSubmit={() => setShowAddressForm(false)}
            />
          </div>
        )}

        <AddressList onEdit={handleEditAddress} />
      </div>
    </div>
  );
};

export default App;