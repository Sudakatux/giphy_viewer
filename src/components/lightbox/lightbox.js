import React from 'react';
import { Link } from 'react-router-dom';
import './lightbox.scss';

export const Lightbox = ({
  criteria,
  currentPage,
  currentImage,
  currentIdx,
  maxIdx,
}) => {
  const {
    images: {
      fixed_width: { url },
    },
    title,
  } = currentImage;

  const nextIdx = currentIdx + 1;
  const previousIdx = currentIdx - 1;

  const isLastIndexInPage = maxIdx === nextIdx;
  const isFirstIndexInPage = previousIdx === -1;

  const previousBtn = isFirstIndexInPage ? (
    <div className="previous disabled"></div>
  ) : (
    <Link
      to={`/${criteria}/${currentPage}/${currentIdx - 1}`}
      className="previous"
    >
      {'<'}
    </Link>
  );

  const nextBtn = isLastIndexInPage ? (
    <div className="next disabled">{'X'}</div>
  ) : (
    <Link to={`/${criteria}/${currentPage}/${currentIdx + 1}`} className="next">
      {'>'}
    </Link>
  );
  return (
    <div className="lightbox">
      <Link to={`/${criteria}/${currentPage}`}>
        <div className="main">
          <div className="image-container">
            <img alt={title} src={url} />
          </div>
          <div class="controls">
            {previousBtn}
            {nextBtn}
          </div>
        </div>
      </Link>
    </div>
  );
};
