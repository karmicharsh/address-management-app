import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { searchAddressThunk, setSelectedLocation } from '../store/LocationSlice';

const defaultIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  center: { lat: number; lng: number };
  onMarkerDragEnd: (lat: number, lng: number) => void;
}

const MapUpdater: React.FC<{ center: { lat: number; lng: number } }> = ({ center }) => {
  const map = useMap();
  map.setView([center.lat, center.lng], map.getZoom());
  return null;
};

const SearchBox: React.FC = () => {
  const dispatch = useDispatch();
  const map = useMap();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      await dispatch(searchAddressThunk(query));
      setQuery('');
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-[1000] max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search address..."
          className="w-full px-4 py-2 rounded-lg shadow-lg border-2 border-white 
                     bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 
                     dark:border-gray-700 dark:text-white
                     focus:outline-none focus:border-blue-500 
                     transition-all duration-200"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSearching}
          className="absolute right-2 top-1/2 -translate-y-1/2 
                     p-2 rounded-full bg-blue-500 text-white
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     transition-colors duration-200"
        >
          {isSearching ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaSearch />
          )}
        </motion.button>
      </form>
    </div>
  );
};

const Map: React.FC<MapProps> = ({ center, onMarkerDragEnd }) => {
  return (
    <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={15}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[center.lat, center.lng]}
          draggable={true}
          icon={defaultIcon}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              onMarkerDragEnd(position.lat, position.lng);
            },
          }}
        />
        <SearchBox />
        <MapUpdater center={center} />
      </MapContainer>
    </div>
  );
};

export default Map;