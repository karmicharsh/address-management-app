import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LocationState, Address } from '../types/address';
import { addressService } from '../services/api';

const initialState: LocationState = {
  currentLocation: null,
  selectedLocation: null,
  addresses: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchAddresses = createAsyncThunk(
  'location/fetchAddresses',
  async () => {
    const addresses = await addressService.getAllAddresses();
    return addresses;
  }
);

export const createAddress = createAsyncThunk(
  'location/createAddress',
  async (address: Omit<Address, 'id'>) => {
    const newAddress = await addressService.createAddress(address);
    return newAddress;
  }
);

export const updateAddress = createAsyncThunk(
  'location/updateAddress',
  async ({ id, address }: { id: string; address: Partial<Address> }) => {
    const updatedAddress = await addressService.updateAddress(id, address);
    return updatedAddress;
  }
);

export const deleteAddressThunk = createAsyncThunk(
  'location/deleteAddress',
  async (id: string) => {
    await addressService.deleteAddress(id);
    return id;
  }
);

export const toggleFavoriteThunk = createAsyncThunk(
  'location/toggleFavorite',
  async (id: string) => {
    const updatedAddress = await addressService.toggleFavorite(id);
    return updatedAddress;
  }
);

export const searchAddressThunk = createAsyncThunk(
  'location/searchAddress',
  async (query: string) => {
    const results = await addressService.searchAddress(query);
    return results;
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<{ lat: number; lng: number } | null>) => {
      state.currentLocation = action.payload;
      if (!state.selectedLocation && action.payload) {
        state.selectedLocation = action.payload;
      }
    },
    setSelectedLocation: (state, action: PayloadAction<{ lat: number; lng: number } | null>) => {
      state.selectedLocation = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch addresses';
      })
      // Create Address
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.unshift(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create address';
      })
      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update address';
      })
      // Delete Address
      .addCase(deleteAddressThunk.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
      })
      // Toggle Favorite
      .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      // Search Address
      .addCase(searchAddressThunk.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          const firstResult = action.payload[0];
          state.selectedLocation = {
            lat: firstResult.latitude,
            lng: firstResult.longitude,
          };
        }
      });
  },
});

export const {
  setCurrentLocation,
  setSelectedLocation,
  setError,
  clearError,
} = locationSlice.actions;

export default locationSlice.reducer;