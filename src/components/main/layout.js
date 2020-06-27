import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SearchBox } from '../search';
import { Thumbnail } from '../thumbnail';
import { Lightbox } from '../lightbox';
import { Pagination } from '../pagination';
import './layout.scss';

import { AMOUNT_PER_PAGE, FIRST_PAGE } from '../../constants';
import { Modal } from '../modal/modal';
import { isNil, isEmpty } from 'ramda';
import { parseLocationParams, searchGifForCriteria } from './utils';

export const Layout = () => {
  const location = useLocation();

  const { criteria, page = FIRST_PAGE, imageIdx } = parseLocationParams(
    location
  );

  const [state, setState] = useState({
    searchResult: { data: [], pagination: {} },
  });

  let history = useHistory();

  useEffect(() => {
    async function search(searchCriteria, pageNumber) {
      const searchResult = await searchGifForCriteria(
        searchCriteria,
        pageNumber
      );
      setState({ searchResult });
    }

    if (!isNil(criteria)) {
      search(criteria, page);
    }
  }, [criteria, page]);

  const onSearch = (criteria) =>
    history.push({
      pathname: '/',
      search: `?criteria=${criteria}&page=${FIRST_PAGE}`,
    });

  const openModal = (idx) =>
    history.push({
      pathname: '/',
      search: `?criteria=${criteria}&page=${FIRST_PAGE}&imageIdx=${idx}`,
    });

  const { searchResult } = state;

  const {
    data: results,
    pagination: { count, total_count: totalCount = 1 },
  } = searchResult;

  const imageIdxNumber = parseInt(imageIdx);
  const pageNumber = parseInt(page);

  const modalImage = results[imageIdxNumber];

  return (
    <div className="layout">
      <div className="search-container">
        <SearchBox onSearch={onSearch} />
      </div>
      <div className="search-results-container">
        {results.map((result, idx) => (
          <Thumbnail
            key={result.id}
            result={result}
            onClick={() => openModal(idx)}
          />
        ))}
      </div>
      <div className="pagination-container">
        {!isEmpty(results) && (
          <Pagination
            totalCount={totalCount}
            itemsPerPage={AMOUNT_PER_PAGE}
            currentPage={pageNumber}
            criteria={criteria}
          />
        )}
      </div>
      {modalImage ? (
        <Modal>
          <Lightbox
            currentImage={modalImage}
            criteria={criteria}
            currentIdx={imageIdxNumber}
            currentPage={page}
            maxIdx={count}
          />
        </Modal>
      ) : null}
    </div>
  );
};
