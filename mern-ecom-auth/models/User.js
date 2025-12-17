const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  profileImage: { type: String, default: '' },
  role: { 
    type: String, 
    enum: ['user', 'shelter', 'admin'],
    default: 'user'
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  adoptedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  listedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password method
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);