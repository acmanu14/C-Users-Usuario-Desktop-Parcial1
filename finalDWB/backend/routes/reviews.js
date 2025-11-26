const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');

// Create review
router.post('/', auth, async (req, res) => {
  try {
    const { restaurantName, rating, visitDate, observations } = req.body;
    const review = await Review.create({
      restaurantName, rating, visitDate, observations,
      user: req.userId
    });
    res.status(201).json(review);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error creando reseña' });
  }
});

// List reviews of authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error' });
  }
});

// Get single review (only owner)
router.get('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if(!review) return res.status(404).json({ message: 'No existe' });
    if(review.user.toString() !== req.userId) return res.status(403).json({ message: 'No autorizado' });
    res.json(review);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error' });
  }
});

// Update review (only owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if(!review) return res.status(404).json({ message: 'No existe' });
    if(review.user.toString() !== req.userId) return res.status(403).json({ message: 'No autorizado' });
    const { restaurantName, rating, visitDate, observations } = req.body;
    review.restaurantName = restaurantName;
    review.rating = rating;
    review.visitDate = visitDate;
    review.observations = observations;
    await review.save();
    res.json(review);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error' });
  }
});

// Delete review (only owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if(!review) return res.status(404).json({ message: 'No existe' });
    if(review.user.toString() !== req.userId) return res.status(403).json({ message: 'No autorizado' });
    await review.remove();
    res.json({ message: 'Eliminado' });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error' });
  }
});

module.exports = router;
