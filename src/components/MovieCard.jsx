import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';

const MovieCard = ({ movie, onAdd, isInWatchList, setSelectedMovie }) => (
  <div
    onClick={() => setSelectedMovie && setSelectedMovie(movie)}
    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
  >
    <img
      src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
      alt={movie.Title}
      className="w-full h-[400px] object-cover"
    />
    <div className="p-4 text-center">
      <h3 className="text-lg font-semibold">{movie.Title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{movie.Year}</p>
      {!isInWatchList && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(movie);
          }}
          className="mt-3 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 mx-auto transition"
        >
          <FaPlus /> Add to Watchlist
        </button>
      )}
    </div>
  </div>
);

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  isInWatchList: PropTypes.bool.isRequired,
  setSelectedMovie: PropTypes.func,
};

export default MovieCard;
