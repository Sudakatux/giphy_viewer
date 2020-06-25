import React from 'react';

export const Thumbnail = ({ result, onClick }) => {
  const {
    images: {
      fixed_width: { height, width, url },
    },
    title,
  } = result;
  return (
    <div>
      <div className="Thumbnail" onClick={onClick}>
        <img alt={title} src={url} height={height} width={width} />
      </div>
    </div>
  );
};
