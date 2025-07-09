import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ query, setQuery }) => (
  <div className="w-full max-w-2xl mx-auto mb-6">
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full px-5 py-3 shadow focus-within:ring-2 ring-purple-500">
      <FaSearch className="text-gray-500 dark:text-gray-300 text-lg" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="flex-1 bg-transparent outline-none text-lg text-gray-900 dark:text-white placeholder-gray-400"
        aria-label="Search for a movie"
      />
    </div>
  </div>
);

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default SearchBar;
