import React from 'react';
import './thumbnail.scss';

export const Thumbnail = ({ result, onClick }) => {
  const {
    images: {
      fixed_width: { url },
    },
    title,
  } = result;
  return (
    <div className="thumbnail" onClick={onClick}>
      <div
        className="image-container"
        style={{ backgroundImage: `url(${url})` }}
      >
        <div className="info">
          <div className="title">{title}</div>
        </div>
      </div>
    </div>
  );
};
