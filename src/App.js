import React, { useState, useEffect } from 'react';
import './App.css';
import searchIcon from './assets/search.svg';
import Moviecard from './Moviecard';

const API_URL = 'http://www.omdbapi.com/?apikey=3636da8f';

/* eslint-disable no-unused-vars */
const movie = {
    "Title": "Italian Spiderman",
    "Year": "2007",
    "imdbID": "tt2705436",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYWNiMmNlNmQtZTI2MS00MzAxLTgxM2QtNDY3ZGQxNDMwZDgzXkEyXkFqcGc@._V1_SX300.jpg"
}
/* eslint-enable no-unused-vars */

const App = () => {

  const [movies, setMovies] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const searchmovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchmovies('Avengers');
  }, []);

  return (
    <div className='app'>
      <h1>MovieSharks</h1>

      <div className='search'>
        <input type='text' placeholder='Search for movies...' 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
        src={searchIcon} 
        alt='Search Icon'  
        onClick={() => searchmovies(searchTerm)} />
      </div>

      {
        movies?.length > 0
          ? ( <div className='container'>
                {movies.map((movie, index) => (
                <Moviecard key={index} movie={movie} />
                ))}
              </div>

          ) : 
          (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }

      
    </div>
  );
}

export default App;