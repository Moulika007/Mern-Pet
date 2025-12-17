const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error('Validation failed');
  }

  const { name, email, password, phone, location } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    location,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate('favorites', 'name category breed images price location')
    .populate('adoptedPets', 'name category breed images adoptedDate')
    .populate('listedPets', 'name category breed images status createdAt');

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      profileImage: user.profileImage,
      role: user.role,
      favorites: user.favorites,
      adoptedPets: user.adoptedPets,
      listedPets: user.listedPets,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.location = req.body.location || user.location;
    user.profileImage = req.body.profileImage || user.profileImage;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      location: updatedUser.location,
      profileImage: updatedUser.profileImage,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add pet to favorites
// @route   POST /api/users/favorites/:petId
// @access  Private
const addToFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const petId = req.params.petId;

  if (user) {
    if (!user.favorites.includes(petId)) {
      user.favorites.push(petId);
      await user.save();
      res.json({ message: 'Pet added to favorites' });
    } else {
      res.status(400);
      throw new Error('Pet already in favorites');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Remove pet from favorites
// @route   DELETE /api/users/favorites/:petId
// @access  Private
const removeFromFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const petId = req.params.petId;

  if (user) {
    user.favorites = user.favorites.filter(
      (favorite) => favorite.toString() !== petId
    );
    await user.save();
    res.json({ message: 'Pet removed from favorites' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user's favorites
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate(
    'favorites',
    'name category breed images price location status'
  );

  if (user) {
    res.json(user.favorites);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
};