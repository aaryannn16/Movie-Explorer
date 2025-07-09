import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onAdd, watchlist, setSelectedMovie }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
    {movies.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        movie={movie}
        onAdd={onAdd}
        isInWatchList={watchlist.some((m) => m.imdbID === movie.imdbID)}
        setSelectedMovie={setSelectedMovie}
      />
    ))}
  </div>
);

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  watchlist: PropTypes.array.isRequired,
  setSelectedMovie: PropTypes.func, // optional for detail drawer
};

export default MovieList;
