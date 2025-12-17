const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Other']
  },
  breed: { type: String, required: true },
  age: { type: String, required: true }, // e.g., "2 years", "6 months"
  gender: { 
    type: String, 
    enum: ['Male', 'Female'],
    required: true 
  },
  size: { 
    type: String, 
    enum: ['Small', 'Medium', 'Large', 'Extra Large'],
    required: true 
  },
  price: { type: Number, required: true, default: 0 },
  images: [{ type: String }], // Array of image URLs
  description: { type: String, required: true },
  location: { type: String, required: true },
  traits: [{ type: String }], // e.g., ['Friendly', 'House Trained']
  healthInfo: {
    vaccinated: { type: Boolean, default: false },
    spayedNeutered: { type: Boolean, default: false },
    houseTrained: { type: Boolean, default: false },
    specialNeeds: { type: String, default: '' }
  },
  contact: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    organization: { type: String, default: '' }
  },
  status: { 
    type: String, 
    enum: ['Available', 'Pending', 'Adopted'],
    default: 'Available'
  },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Index for search functionality
PetSchema.index({ name: 'text', breed: 'text', description: 'text' });

module.exports = mongoose.model('Pet', PetSchema);