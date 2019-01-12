import { State, Child, DEFAULT_STATE, DeviceId, Device } from './model';
import { ActionsUnion, ActionTypes } from './actions';
import * as childHelper from './helpers/child-helper';
import { addToDictionary, modElementInDictionary, deleteFromDictionary } from './helpers/helper';

export function reducer(
  state = DEFAULT_STATE,
  action: ActionsUnion): State {

  switch (action.type) {
    case ActionTypes.DeleteChild: {
      const [children, deviceChild] =
        childHelper.deleteChild(state.children, state.deviceChild, action.payload.childId);

      return Object.assign({}, state, { children: children, deviceChild: deviceChild });
    }

    case ActionTypes.AddAnonymChild:
      return Object.assign({}, state, { children: childHelper.addAnonymChild(state.children) });
    case ActionTypes.ModChildName: {
      const child: Child = { name: action.payload.childName };
      const children = modElementInDictionary(state.children, action.payload.childId, child);

      return Object.assign({}, state, { children: children });
    }

    case ActionTypes.DeleteDevice: {
      const id = action.payload.deviceId;
      const devices = deleteFromDictionary(state.devices, id);
      const deviceChild = deleteFromDictionary(state.deviceChild, id);

      return Object.assign({}, state, { devices: devices, deviceChild: deviceChild });
    }

    case ActionTypes.AddDevice:
      return Object.assign({}, state,
        { devices: addToDictionary(state.devices, { name: '', mac: '' }) });

    case ActionTypes.ModDevice: {
      const id: DeviceId = action.payload.deviceId;
      const device: Device = { name: action.payload.name, mac: action.payload.mac };

      return Object.assign({}, state,
        { devices: modElementInDictionary(state.devices, id, device) });
    }

    case ActionTypes.SetDeviceChild: {
      const childId = action.payload.childId;
      const deviceId = action.payload.deviceId;

      return Object.assign({}, state,
        { deviceChild: modElementInDictionary(state.deviceChild, deviceId, childId) });
    }

    default:
      return state;
  }
}
