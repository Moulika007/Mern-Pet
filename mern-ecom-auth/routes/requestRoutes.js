const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  createRequest, 
  getSellerRequests, 
  approveRequest, 
  rejectRequest 
} = require('../controllers/requestController');

router.post('/', protect, createRequest);
router.get('/received', protect, getSellerRequests); // Notifications
router.put('/:id/approve', protect, approveRequest);
router.put('/:id/reject', protect, rejectRequest);

module.exports = router;