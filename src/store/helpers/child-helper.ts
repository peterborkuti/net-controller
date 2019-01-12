import { State, Child, Children, DeviceChild, ChildId } from '../model';
import * as helper from './helper';
import { deleteFromDictionary } from './helper';

export function deleteChild(children: Children, deviceChild: DeviceChild, childId: ChildId):
    [Children, DeviceChild] {
  const children_: Children = deleteFromDictionary(children, childId);

  const devicesOfChild: number[] =
      Object.keys(deviceChild).
      filter(device => deviceChild[device] === childId).
      map(key => +key);

  const deviceChild_: DeviceChild = deleteFromDictionary(deviceChild, ...devicesOfChild);

  return [children_, deviceChild_];
}

export function addAnonymChild(children: Children): Children {
  const child: Child = { name: '' };
  const children_: Children = helper.addToDictionary(children, child);

  return children_;
}
