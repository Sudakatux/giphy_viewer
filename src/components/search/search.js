import React, { useState } from 'react';
import './search.scss';

export const SearchBox = ({ onSearch }) => {
  const [state, setText] = useState('');
  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') {
      onSearch(state);
    }
  };

  const handleChange = ({ target: { value } }) => setText(value);

  return (
    <span className="search">
      <input
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={state}
      />
      <span className="button-container">
        <button type="button" onClick={() => onSearch(state)}>
          <span>Search</span>
        </button>
      </span>
    </span>
  );
};
