import React from 'react';
import { range, last } from 'ramda';
import { Link } from 'react-router-dom';
import { queryParamsObjectToString } from '../utils';
import './pagination.scss';

export const Pagination = ({
  totalCount,
  itemsPerPage,
  currentPage,
  criteria,
  rating,
}) => {
  const lastPage = Math.ceil(totalCount / itemsPerPage);
  const delta = 2;
  const dots = '...';

  const toConstructor = (pageNumber) => ({
    pathname: '/',
    search: `?${queryParamsObjectToString({
      criteria,
      page: pageNumber,
      rating,
    })}`,
  });

  const renderPage = (pageNumber) => (
    <li
      className={`page-holder ${pageNumber === currentPage ? 'current' : ''}`}
      key={`${pageNumber}_pageholder`}
    >
      <Link to={toConstructor(pageNumber)}>{pageNumber}</Link>
    </li>
  );

  const renderDots = (aNumber) => (
    <li className="page-holder dots" key={`dots_${aNumber}`}>
      ...
    </li>
  );

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const previousPageBtn = isFirstPage ? (
    <li className="page-holder prev disabled">{'<'}</li>
  ) : (
    <li className="page-holder prev">
      <Link to={toConstructor(previousPage)}>{'<'}</Link>
    </li>
  );

  const lastPageBtn = isLastPage ? (
    <li className="page-holder prev disabled">{'>'}</li>
  ) : (
    <li className="page-holder next">
      <Link to={toConstructor(nextPage)}>{'>'}</Link>
    </li>
  );

  return (
    <div className="pagination">
      <ul>
        {previousPageBtn}
        {range(1, lastPage)
          .reduce((pages, page) => {
            const isFirstOrLastPage = page === 1 || page === lastPage;

            if (isFirstOrLastPage) {
              return pages.concat(page);
            }

            const isWithinDeltaRange =
              page - delta <= currentPage && page + delta >= currentPage;

            if (isWithinDeltaRange) {
              return pages.concat(page);
            }

            if (last(pages) !== dots) {
              return pages.concat(dots);
            }

            return pages;
          }, [])
          .map((el, idx) => (el === dots ? renderDots(idx) : renderPage(el)))}
        {lastPageBtn}
      </ul>
    </div>
  );
};
