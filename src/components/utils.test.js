import { queryParamsObjectToString, parseLocationParams } from './utils';

describe('queryParamsObjectToString', () => {
  const pageNumber = 1;
  const criteria = 'cool criteria';
  const someIdx = 0;
  const someObject = {
    pageNumber,
    criteria,
    someIdx,
  };
  it('Should take an object and return a string', () => {
    const result = queryParamsObjectToString(someObject);
    expect(result).toContain(`pageNumber=${pageNumber}`);
    expect(result).toContain(`criteria=${criteria}`);
    expect(result).toContain(`someIdx=${someIdx}`);
  });

  it('Should not take into account null or undefined', () => {
    const withNullOrUndefined = { ...someObject, myKey: null };
    const result = queryParamsObjectToString(someObject);
    expect(result).toContain(`pageNumber=${pageNumber}`);
    expect(result).toContain(`criteria=${criteria}`);
    expect(result).toContain(`someIdx=${someIdx}`);
    expect(result).not.toContain(`myKey=${someIdx}`);
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
