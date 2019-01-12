import * as helper from '../../../src/store/helpers/child-helper';
import { Children, DeviceChild } from '../../../src/store/model';
const deepFreeze = require('deep-freeze');

describe('delete a child', () => {
  it('should do nothing with empty objetcs', () => {
    const children: Children = {};
    const deviceChild: DeviceChild = {};

    deepFreeze(children);
    deepFreeze(deviceChild);

    const [children_, deviceChild_] = helper.deleteChild(children, deviceChild, 0);
    expect(children_).toEqual({});
    expect(deviceChild_).toEqual({});
  });

  it('should delete a child', () => {
    const children: Children = {};
    const deviceChild: DeviceChild = {};

    const childId = 0;
    children[childId] = {name: 'a'};
    children[1] = {name: 'b'};

    deviceChild[100] = childId;
    deviceChild[101] = childId;
    deviceChild[102] = 1;

    deepFreeze(children);
    deepFreeze(deviceChild);

    const [children_, deviceChild_] = helper.deleteChild(children, deviceChild, childId);

    expect(Object.keys(children_).length).toBe(1);
    expect(children_[1]).toEqual({name: 'b'});

    expect(Object.keys(deviceChild_).length).toBe(1);
    expect(deviceChild_[102]).toEqual(1);
  });
});
