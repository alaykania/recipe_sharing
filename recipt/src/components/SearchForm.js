import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      try {
        const response = await axios.get(`http://localhost:5002/api/search?query=${query}`);
        onSearch(response.data); 
      } catch (error) {
        console.error('Error searching:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search by ingredient or tag"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};
export default SearchBar;