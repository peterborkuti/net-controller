import { State } from './model';
import { ActionsUnion, ActionTypes, AddAnonymChild } from './actions';

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
    default:
        return state;
  }
}
