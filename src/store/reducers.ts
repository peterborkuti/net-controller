import { State } from './model';
import { ActionsUnion, ActionTypes, AddAnonymChild, DeleteDevice, AddDevice, ModDevice } from './actions';

export function reducer(
    state = new State(),
    action: ActionsUnion): State {

  switch (action.type) {
    case ActionTypes.DeleteChild:
        return state.deleteChild(action.payload.childId);
    case ActionTypes.AddAnonymChild:
        return state.addAnonymChild();
    case ActionTypes.ModChildName:
        return state.modChildName(action.payload.childId, action.payload.childName);
    case ActionTypes.DeleteDevice:
        return state.deleteDevice(action.payload.deviceId);
    case ActionTypes.AddDevice:
        return state.addDevice();
    case ActionTypes.ModDevice:
        return state.modDevice(action.payload.deviceId, action.payload.name, action.payload.mac);
    default:
        return state;
  }
}
