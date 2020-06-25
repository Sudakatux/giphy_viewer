import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { SearchBox } from '../search';
import { Thumbnail } from '../thumbnail';
import { Pagination } from '../pagination';
import './layout.scss';

import { API_KEY, BASE_URL } from '../../constants';
import { Modal } from '../modal/modal';
import { isNil } from 'ramda';

const queryParamsToString = (queryParamsObj) =>
  Object.entries(queryParamsObj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

const searchGifForCriteria = (criteria, pageNumber) => {
  const offset = (pageNumber - 1) * 20;
  const queryParams = {
    api_key: API_KEY,
    q: criteria, // TODO maybe encode
    limit: 20, // Extract to configuration
    offset,
    lang: 'en',
    random_id: 'someRandomIdForSession',
  };

  const url = `${BASE_URL}?${queryParamsToString(queryParams)}`;
  console.log(url);
  return fetch(url).then((response) => response.json());
};

export const Layout = () => {
  const { criteria, page = 1, imageIdx } = useParams(); // Use query params instead
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

  const onSearch = (criteria) => history.push(`/${criteria}/1`);
  const toggleModal = (idx) => history.push(`/${criteria}/${page}/${idx}`);

  const { searchResult } = state;

  const {
    data: results,
    pagination: { total_count: totalCount = 1 },
  } = searchResult;

  // console.log(searchResult);
  const modalImage = results[imageIdx];

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
            onClick={() => toggleModal(idx)}
          />
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          totalCount={totalCount}
          itemsPerPage={20}
          currentPage={page}
        />
      </div>
      {modalImage ? (
        <Modal>
          <Thumbnail result={modalImage} onClick={toggleModal} />
        </Modal>
      ) : null}
    </div>
  );
};
