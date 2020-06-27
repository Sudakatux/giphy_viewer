import React from 'react';
import { Link } from 'react-router-dom';
import './lightbox.scss';
import { isNil } from 'ramda';
import { queryParamsObjectToString } from '../utils';

export const Lightbox = ({
  criteria,
  currentPage,
  currentImage,
  currentIdx,
  rating,
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

  const toConstructor = (imageIdx) =>
    isNil(imageIdx)
      ? {
          pathname: '/',
          search: `?${queryParamsObjectToString({
            criteria,
            page: currentPage,
            rating,
          })}`,
        }
      : {
          pathname: '/',
          search: `?${queryParamsObjectToString({
            criteria,
            page: currentPage,
            imageIdx,
            rating,
          })}`,
        };

  const previousBtn = isFirstIndexInPage ? (
    <div className="previous disabled"></div>
  ) : (
    <Link to={toConstructor(previousIdx)} className="previous">
      {'<'}
    </Link>
  );

  const nextBtn = isLastIndexInPage ? (
    <div className="next disabled">{'X'}</div>
  ) : (
    <Link to={toConstructor(nextIdx)} className="next">
      {'>'}
    </Link>
  );
  return (
    <div className="lightbox">
      <Link to={toConstructor()}>
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
