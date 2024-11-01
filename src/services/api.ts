import axios from 'axios';
import { Address } from '../types/address';

const API_URL = 'http://localhost:5000/api';

export const addressService = {
  getAllAddresses: async () => {
    const response = await axios.get(`${API_URL}/addresses`);
    return response.data;
  },

  createAddress: async (address: Omit<Address, 'id'>) => {
    const response = await axios.post(`${API_URL}/addresses`, address);
    return response.data;
  },

  updateAddress: async (id: string, address: Partial<Address>) => {
    const response = await axios.patch(`${API_URL}/addresses/${id}`, address);
    return response.data;
  },

  deleteAddress: async (id: string) => {
    await axios.delete(`${API_URL}/addresses/${id}`);
  },

  toggleFavorite: async (id: string) => {
    const response = await axios.patch(`${API_URL}/addresses/${id}/toggle-favorite`);
    return response.data;
  },

  searchAddress: async (query: string) => {
    const response = await axios.get(`${API_URL}/addresses/search`, {
      params: { query }
    });
    return response.data;
  }
};