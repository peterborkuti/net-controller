import * as helper from '../../../src/store/helpers/helper';
import { Dictionary } from '../../../src/store/model';
import { modElementInDictionary } from '../../../src/store/helpers/helper';
const deepFreeze = require('deep-freeze');

describe('get a new id for a dictionary', () => {
  it('should give 0 for empty dict', () => {
    expect(helper.getNewId({})).toBe(0);
  });

  it('should give max+1 for normal case', () => {
    const maxId = 4;
    const dict: Dictionary<string> = {};
    dict[1] = 'a';
    dict[maxId] = 'b';
    dict[2] = 'c';
    expect(helper.getNewId(dict)).toBe(maxId + 1);
  });
});

describe ('add to dictionary', () => {
  it('should add an element to an empty dictionary', () => {
    const dict: Dictionary<string> = {};

    deepFreeze(dict);

    const newDict = helper.addToDictionary(dict, 'hello');

    expect(newDict[0]).toBe('hello');
  });

  it('should add an element to an dictionary', () => {
    const dict: Dictionary<string> = {};
    dict[1] = 'a';

    deepFreeze(dict);

    const newDict = helper.addToDictionary(dict, 'hello');

    expect(newDict[2]).toBe('hello');
  });
});

describe ('delete from dictionary', () => {
  it('should not delete from empty dictionary', () => {
    const dict: Dictionary<string> = {};

    deepFreeze(dict);

    const newDict = helper.deleteFromDictionary(dict, 1);

    expect(newDict).toEqual({});
  });

  it('should delete an element to an dictionary', () => {
    const dict: Dictionary<string> = {};
    dict[1] = 'a';
    dict[2] = 'b';

    deepFreeze(dict);

    const newDict = helper.deleteFromDictionary(dict, 1);

    expect(newDict[2]).toBe('b');
    expect(Object.keys(newDict).length).toBe(1);
  });

  it('should delete more than one element from a dictionary', () => {
    const dict: Dictionary<string> = {};
    dict[1] = 'a';
    dict[2] = 'b';
    dict[3] = 'c';

    deepFreeze(dict);

    const newDict = helper.deleteFromDictionary(dict, 1, 3);

    expect(newDict[2]).toBe('b');
    expect(Object.keys(newDict).length).toBe(1);
  });
});

describe ('modify a dictionary', () => {
  it('should modify an existing element', () => {
    const dict: Dictionary<string> = {};
    dict[1] = 'a';

    deepFreeze(dict);

    const newDict = helper.modElementInDictionary(dict, 1, 'b');

    expect(Object.keys(newDict).length).toBe(1);
    expect(newDict[1]).toBe('b');
  });
});

describe ('convert a dictionary to an array', () => {
  it('should convert', () => {
    const dict: Dictionary<string> = {};
    dict[1] = 'a';

    deepFreeze(dict);

    const arr = helper.dictionaryToArray(dict);

    expect(arr.length).toBe(1);
    expect(arr[0]).toEqual({id: 1, e: 'a'});
  });
});
