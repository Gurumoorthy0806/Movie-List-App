import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/movies').then((response) => {
      setMovies(response.data);
    });
  }, []);

  const addMovie = () => {
    axios
      .post('http://localhost:5000/movies', { title, director, year })
      .then((response) => {
        setMovies([...movies, response.data]);
      });
  };

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:5000/movies/${id}`).then(() => {
      setMovies(movies.filter((movie) => movie._id !== id));
    });
  };

  return (
    <div>
      <h1>Movie List</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Director"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={addMovie}>Add Movie</button>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {movie.title} - {movie.director} ({movie.year})
            <button onClick={() => deleteMovie(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
