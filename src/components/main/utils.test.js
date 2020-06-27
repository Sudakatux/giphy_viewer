import { queryParamsToString, parseLocationParams } from './utils';

describe('queryParamsToString', () => {
  const pageNumber = 1;
  const criteria = 'cool criteria';
  const someIdx = 0;
  const someObject = {
    pageNumber,
    criteria,
    someIdx,
  };
  it('Should take an object and return a string', () => {
    const result = queryParamsToString(someObject);
    expect(result).toContain(`pageNumber=${pageNumber}`);
    expect(result).toContain(`criteria=${criteria}`);
    expect(result).toContain(`someIdx=${someIdx}`);
  });
});

describe('parseLocationParams', () => {
  it('Should take a location object and convert search params to object', () => {
    const a = 'some';
    const b = 'thing';

    const mockLocationObject = { search: `?a=${a}&b=${b}` };
    const result = parseLocationParams(mockLocationObject);
    expect(result).toEqual({
      a,
      b,
    });
  });
});
