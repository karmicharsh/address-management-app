import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationState, Address } from '../types/address';

const initialState: LocationState = {
  currentLocation: null,
  selectedLocation: null,
  addresses: [],
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
      state.currentLocation = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
      state.selectedLocation = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    deleteAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const address = state.addresses.find(addr => addr.id === action.payload);
      if (address) {
        address.isFavorite = !address.isFavorite;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentLocation,
  setSelectedLocation,
  addAddress,
  updateAddress,
  deleteAddress,
  toggleFavorite,
  setLoading,
  setError,
} = locationSlice.actions;

export default locationSlice.reducer;