import express from 'express';
import NodeGeocoder from 'node-geocoder';
import { addresses } from '../data/addresses.js';

const router = express.Router();

const geocoder = NodeGeocoder({
  provider: process.env.GEOCODER_PROVIDER || 'openstreetmap'
});

// Get all addresses
router.get('/', (req, res) => {
  try {
    const sortedAddresses = [...addresses].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    res.json(sortedAddresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new address
router.post('/', (req, res) => {
  try {
    const newAddress = {
      ...req.body,
      id: (addresses.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    addresses.unshift(newAddress);
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update address
router.patch('/:id', (req, res) => {
  try {
    const index = addresses.findIndex(addr => addr.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }
    
    addresses[index] = {
      ...addresses[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    res.json(addresses[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete address
router.delete('/:id', (req, res) => {
  try {
    const index = addresses.findIndex(addr => addr.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }
    
    addresses.splice(index, 1);
    res.json({ message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle favorite
router.patch('/:id/toggle-favorite', (req, res) => {
  try {
    const index = addresses.findIndex(addr => addr.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }
    
    addresses[index] = {
      ...addresses[index],
      isFavorite: !addresses[index].isFavorite,
      updatedAt: new Date().toISOString()
    };
    
    res.json(addresses[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search address using geocoding
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const results = await geocoder.geocode(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;