const express = require('express');
const router = express.Router();
const {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  getFeaturedPets,
  likePet,
  getPetsByCategory
} = require('../controllers/petController'); // Points to the file above

const { protect, admin } = require('../middleware/authMiddleware'); 
const { body } = require('express-validator');

// Validation middleware
const validatePet = [
  body('name').notEmpty().withMessage('Pet name is required'),
  body('category').isIn(['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Other']).withMessage('Invalid category'),
  body('breed').notEmpty().withMessage('Breed is required'),
  body('age').notEmpty().withMessage('Age is required'),
  body('gender').isIn(['Male', 'Female']).withMessage('Gender must be Male or Female'),
  body('size').isIn(['Small', 'Medium', 'Large', 'Extra Large']).withMessage('Invalid size'),
  body('description').notEmpty().withMessage('Description is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('contact.name').notEmpty().withMessage('Contact name is required'),
  body('contact.email').isEmail().withMessage('Valid email is required'),
  body('contact.phone').notEmpty().withMessage('Contact phone is required')
];

// Public routes
router.get('/', getPets);
router.get('/featured', getFeaturedPets);
router.get('/category/:category', getPetsByCategory); // This was causing the error
router.get('/:id', getPetById);
router.post('/:id/like', likePet);

// Protected routes (Require Login)
router.post('/', protect, validatePet, createPet);
router.put('/:id', protect, updatePet);
router.delete('/:id', protect, deletePet);

module.exports = router;