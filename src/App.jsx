import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import Watchlist from './components/WatchList';
import useDebounce from './hooks/useDebounce';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './index.css'; // Tailwind styles

const API_KEY = '7dbe6cd8';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };
  
  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((movie) => movie.imdbID !== id));
  };
  
  const reorderWatchlist = (newList) => {
    setWatchlist(newList);
  };
  

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const debouncedQuery = useDebounce(query);

  // 💡 Sync dark mode to <html> class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // 🔍 Fetch movies
  useEffect(() => {
    if (debouncedQuery.length > 2) {
      fetch(API_URL + debouncedQuery)
        .then((res) => res.json())
        .then((data) => {
          if (data.Response === 'True') {
            setMovies(data.Search.slice(0, 10));
          } else {
            setMovies([]);
          }
        })
        .catch((err) => console.error('API Error:', err));
    } else {
      setMovies([]);
    }
  }, [debouncedQuery]);

  // 🎬 Fetch full movie details
  useEffect(() => {
    if (selectedMovie) {
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovie.imdbID}`)
        .then((res) => res.json())
        .then(setMovieDetails);
    }
  }, [selectedMovie]);

  // 💾 Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  return (
    <div className="min-h-screen px-4 py-10 sm:px-10 transition duration-300 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">🎬 Movie Explorer</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <SearchBar query={query} setQuery={setQuery} />

      <div className="my-6">
        <label className="block mb-2 text-sm font-medium">🎯 Filter by Genre:</label>
        <select
          className="w-full sm:w-64 px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
          onChange={(e) => setQuery(e.target.value)}
        >
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="romance">Romance</option>
          <option value="thriller">Thriller</option>
          <option value="sci-fi">Sci-Fi</option>
        </select>
      </div>

      <MovieList
        movies={movies}
        onAdd={addToWatchlist}
        watchlist={watchlist}
        setSelectedMovie={setSelectedMovie}
      />

<Watchlist
  list={watchlist}
  onRemove={removeFromWatchlist}
  onReorder={reorderWatchlist}
/>


      {/* Optional Movie Detail Drawer */}
      {selectedMovie && movieDetails && (
        <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white dark:bg-gray-800 shadow-lg overflow-y-auto z-50 p-6 transition transform">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{movieDetails.Title}</h2>
            <button
              onClick={() => setSelectedMovie(null)}
              className="text-red-500 text-sm hover:underline"
            >
              Close ✖️
            </button>
          </div>
          <img src={movieDetails.Poster} alt={movieDetails.Title} className="w-full rounded mb-4" />
          <p><strong>📅 Year:</strong> {movieDetails.Year}</p>
          <p><strong>⭐ IMDb:</strong> {movieDetails.imdbRating}</p>
          <p><strong>🎭 Genre:</strong> {movieDetails.Genre}</p>
          <p className="mt-2"><strong>📝 Plot:</strong> {movieDetails.Plot}</p>
        </div>
      )}
    </div>
  );
}

export default App;
