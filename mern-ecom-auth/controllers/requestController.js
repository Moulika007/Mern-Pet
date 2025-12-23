const AdoptionRequest = require('../models/AdoptionRequest');
const Pet = require('../models/Pet');

// 1. Create a Request (Buyer clicks "Adopt")
exports.createRequest = async (req, res) => {
  const { petId, sellerId } = req.body;
  try {
    // Prevent duplicate requests
    const existingRequest = await AdoptionRequest.findOne({ 
      buyer: req.user._id, 
      pet: petId 
    });

    if (existingRequest) {
      return res.status(400).json({ message: "You have already requested this pet." });
    }

    const request = await AdoptionRequest.create({
      buyer: req.user._id,
      seller: sellerId,
      pet: petId
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get Notifications (For Seller)
exports.getSellerRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({ seller: req.user._id, status: 'pending' })
      .populate('buyer', 'name email') // Show who wants to buy
      .populate('pet', 'name image');  // Show which pet
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Approve Request (The Magic Part ✨)
exports.approveRequest = async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Mark as approved
    request.status = 'approved';
    await request.save();

    // AUTOMATICALLY DELETE THE PET from the listings
    await Pet.findByIdAndDelete(request.pet);

    // Optional: Reject all other pending requests for this same pet
    await AdoptionRequest.updateMany(
      { pet: request.pet, _id: { $ne: request._id } },
      { status: 'rejected' }
    );

    res.json({ message: "Request Approved! Pet has been removed from listings." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Reject Request
exports.rejectRequest = async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);
    request.status = 'rejected';
    await request.save();
    res.json({ message: "Request Rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};