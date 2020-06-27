import React from 'react';
import { equals } from 'ramda';
import './radiogroup.scss';
export const RadioGroup = ({ checkedValue, onChange }) => {
  const isSelected = equals(checkedValue);
  return (
    <div className="radiogroup">
      <label className="container">
        G
        <input
          type="radio"
          checked={isSelected('g')}
          name="radio"
          onChange={() => onChange('g')}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        PG
        <input
          type="radio"
          checked={isSelected('pg')}
          name="radio"
          onChange={() => onChange('pg')}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        PG-13
        <input
          type="radio"
          checked={isSelected('pg-13')}
          name="radio"
          onChange={() => onChange('pg-13')}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        R
        <input
          type="radio"
          checked={isSelected('r')}
          name="radio"
          onChange={() => onChange('r')}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};
