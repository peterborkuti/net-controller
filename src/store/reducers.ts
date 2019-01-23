import { State, Child, DEFAULT_STATE, DeviceId, Device, Time } from './model';
import { ActionsUnion, ActionTypes, SetAllocatedTime } from './actions';
import * as childHelper from './helpers/child-helper';
import { addToDictionary, modElementInDictionary, deleteFromDictionary } from './helpers/helper';
import { NAME_SIZE, MAC_SIZE } from '../app/const';

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
      const child: Child = { name: action.payload.childName.slice(0, NAME_SIZE) };
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
      const mac = action.payload.mac.slice(0, MAC_SIZE);
      const name = action.payload.name || mac.slice(0, NAME_SIZE);

      const device: Device = { name: name, mac: mac };

      return Object.assign({}, state,
        { devices: modElementInDictionary(state.devices, id, device) });
    }

    case ActionTypes.SetDeviceChild: {
      const childId = action.payload.childId;
      const deviceId = action.payload.deviceId;

      return Object.assign({}, state,
        { deviceChild: modElementInDictionary(state.deviceChild, deviceId, childId) });
    }

    case ActionTypes.SetAllocatedTime: {
      const deviceId = action.payload.deviceId;
      const allocatedTime = action.payload.allocatedTime;
      const time: Time = {
        allocated: allocatedTime,
        remaining: (state.deviceTime[deviceId] && state.deviceTime[deviceId].remaining) || 0 };

      return Object.assign({}, state,
        { deviceTime: modElementInDictionary(state.deviceTime, deviceId, time) });
    }

    case ActionTypes.AddExtraTime: {
      const deviceId = action.payload.deviceId;
      const time: Time = {
        allocated: (state.deviceTime[deviceId] && state.deviceTime[deviceId].allocated) || 0,
        remaining: (state.deviceTime[deviceId] && state.deviceTime[deviceId].remaining + 1) || 1
      };

      return Object.assign({}, state,
        { deviceTime: modElementInDictionary(state.deviceTime, deviceId, time) });
    }

    default:
      return state;
  }
}
