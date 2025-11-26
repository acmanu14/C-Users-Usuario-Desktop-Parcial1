const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  rating: { type: Number, required: true },
  visitDate: { type: Date, required: true },
  observations: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
