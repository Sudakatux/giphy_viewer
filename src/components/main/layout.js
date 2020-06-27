import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SearchBox } from '../search';
import { Thumbnail } from '../thumbnail';
import { Lightbox } from '../lightbox';
import { Pagination } from '../pagination';
import './layout.scss';

import {
  API_KEY,
  BASE_URL,
  AMOUNT_PER_PAGE,
  FIRST_PAGE,
} from '../../constants';
import { Modal } from '../modal/modal';
import { isNil, isEmpty, tail } from 'ramda';

const queryParamsToString = (queryParamsObj) =>
  Object.entries(queryParamsObj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

const parseLocationParams = ({ search = '' }) => {
  if (isEmpty(search)) return {};

  const searchParams = tail(search);
  const individualParams = searchParams.split('&');
  return individualParams.reduce((acc, val) => {
    const [key, value] = val.split('=');
    const decodedValue = decodeURIComponent(value);
    return { ...acc, [key]: decodedValue };
  }, {});
};

const searchGifForCriteria = (criteria, pageNumber) => {
  const offset = (pageNumber - 1) * AMOUNT_PER_PAGE;
  const queryParams = {
    api_key: API_KEY,
    q: criteria,
    limit: AMOUNT_PER_PAGE, // Extract to configuration
    offset,
    lang: 'en',
    random_id: 'someRandomIdForSession',
  };

  const url = `${BASE_URL}?${queryParamsToString(queryParams)}`;
  return fetch(url).then((response) => response.json());
};

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
