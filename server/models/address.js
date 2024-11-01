import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['home', 'office', 'other'],
    required: true
  },
  street: {
    type: String,
    required: true
  },
  apartment: String,
  area: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Address', addressSchema);