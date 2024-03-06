import React from 'react';
import searchIcon from '../assets/loop.svg';

const SearchBar = ({ query, onSearchChange, onSearchSubmit }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Rechercher des livres..."
                value={query}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
            />
            <button onClick={() => onSearchSubmit(query)} className="search-button">
                <img src={searchIcon} alt="Search" className="search-icon" />
            </button>
        </div>
    );
};

export default SearchBar;
