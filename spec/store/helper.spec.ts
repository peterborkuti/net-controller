import * as helper from '../../src/store/helper';

describe('getNewId', () => {
  it('should give 0 for empty array', () => {
    expect(helper.getNewId([])).toBe(0);
  });

  it('should give max+1 for normal case', () => {
    const maxId = 4;
    const arr = [{id: 1}, {id: maxId}, {id: 1}];
    expect(helper.getNewId(arr)).toBe(maxId + 1);
  });
});
