import React from 'react';
import { range } from 'ramda';
import './pagination.scss';

export const Pagination = ({
  totalCount,
  itemsPerPage,
  currentPage,
  // searchCriteria,
}) => {
  const amountOfPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="pagination">
      <div className="previousPage"></div>
      {range(1, amountOfPages).map((pageNumber) => (
        <div
          className={`pageHolder ${
            pageNumber === parseInt(currentPage) ? 'current' : ''
          }`}
          key={`${pageNumber}_pageholder`}
        >
          {pageNumber}
        </div>
      ))}
      <div className="nextPage"></div>
    </div>
  );
};
