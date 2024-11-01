export interface Address {
    id: string;
    type: 'home' | 'office' | 'other';
    street: string;
    apartment: string;
    area: string;
    city: string;
    state: string;
    zipCode: string;
    lat: number;
    lng: number;
    isFavorite: boolean;
  }
  
  export interface LocationState {
    currentLocation: {
      lat: number;
      lng: number;
    } | null;
    selectedLocation: {
      lat: number;
      lng: number;
    } | null;
    addresses: Address[];
    loading: boolean;
    error: string | null;
  }