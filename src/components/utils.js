import { API_KEY, BASE_URL, AMOUNT_PER_PAGE } from '../constants';
import { isEmpty, tail, isNil } from 'ramda';

export const queryParamsObjectToString = (queryParamsObj) =>
  Object.entries(queryParamsObj)
    .filter(([__, value]) => !isNil(value))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export const parseLocationParams = ({ search = '' }) => {
  if (isEmpty(search)) return {};

  const searchParams = tail(search);
  const individualParams = searchParams.split('&');
  return individualParams.reduce((acc, val) => {
    const [key, value] = val.split('=');
    const decodedValue = decodeURIComponent(value);
    return { ...acc, [key]: decodedValue };
  }, {});
};

export const searchGifForCriteria = (criteria, pageNumber, rating) => {
  const offset = (pageNumber - 1) * AMOUNT_PER_PAGE;
  const queryParams = {
    api_key: API_KEY,
    q: criteria,
    limit: AMOUNT_PER_PAGE, // Extract to configuration
    offset,
    lang: 'en',
    rating,
    random_id: 'someRandomIdForSession',
  };

  const url = `${BASE_URL}?${queryParamsObjectToString(queryParams)}`;
  return fetch(url).then((response) => response.json());
};
