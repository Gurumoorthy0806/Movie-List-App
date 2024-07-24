const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.post('/movies', async (req, res) => {
  const newMovie = new Movie(req.body);
  await newMovie.save();
  res.json(newMovie);
});

app.delete('/movies/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
const movieRoutes = require('./routes/movies');
app.use('/movies', movieRoutes);

