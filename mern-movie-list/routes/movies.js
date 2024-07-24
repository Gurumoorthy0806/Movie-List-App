const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.post('/', async (req, res) => {
  const newMovie = new Movie(req.body);
  await newMovie.save();
  res.json(newMovie);
});

router.delete('/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });
});

module.exports = router;
