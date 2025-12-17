const Pet = require('../models/Pet'); // Ensure your Model file is named Pet.js

// @desc    Get all pets
// @route   GET /api/pets
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single pet by ID
// @route   GET /api/pets/:id
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pets by category
// @route   GET /api/pets/category/:category
const getPetsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    // Case-insensitive find
    const pets = await Pet.find({ 
      category: { $regex: new RegExp('^' + category + '$', 'i') } 
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured pets
// @route   GET /api/pets/featured
const getFeaturedPets = async (req, res) => {
  try {
    const pets = await Pet.find({ featured: true }).limit(5);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a pet
// @route   POST /api/pets
const createPet = async (req, res) => {
  try {
    // Assuming 'protect' middleware adds 'user' to req
    const petData = {
      ...req.body,
      owner: req.user ? req.user._id : req.body.owner // Fallback if no auth
    };
    
    const pet = new Pet(petData);
    const createdPet = await pet.save();
    res.status(201).json(createdPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a pet
// @route   PUT /api/pets/:id
const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet) {
      // Check ownership if needed: if (pet.owner.toString() !== req.user._id.toString()) ...
      
      Object.assign(pet, req.body);
      const updatedPet = await pet.save();
      res.json(updatedPet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a pet
// @route   DELETE /api/pets/:id
const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet) {
      if (pet.owner && pet.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this pet' });
      }
      await pet.deleteOne();
      res.json({ message: 'Pet removed' });
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like a pet
// @route   POST /api/pets/:id/like
const likePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      pet.likes = (pet.likes || 0) + 1;
      await pet.save();
      res.json({ likes: pet.likes });
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exporting ALL functions to match the route file
module.exports = {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  getFeaturedPets,
  likePet,
  getPetsByCategory
};