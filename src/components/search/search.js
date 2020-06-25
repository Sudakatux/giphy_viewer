import React, { useState } from 'react';

export const SearchBox = ({ onSearch }) => {
  const [state, setText] = useState('');
  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') {
      onSearch(state);
    }
  };

  const handleChange = ({ target: { value } }) => setText(value);

  return (
    <input
      type="text"
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      value={state}
    />
  );
};
