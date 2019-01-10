import { Action } from '@ngrx/store';

export enum ActionTypes {
  ModChildName = '[ChildList] Modify a child name',
  AddAnonymChild = '[ChildList] Add a new child without name',
  DeleteChild = '[ChildList] Delete a child'
}

export class ModChildName implements Action {
  readonly type = ActionTypes.ModChildName;
  readonly payload: { childId: number, childName: string };

  constructor(childId: number, childName: string) {
    this.payload = { childId, childName };
  }
}

export class AddAnonymChild implements Action {
  readonly type = ActionTypes.AddAnonymChild;
  readonly payload = {};
}

export class DeleteChild implements Action {
  readonly type = ActionTypes.DeleteChild;
  readonly payload: { childId: number };

  constructor(childId: number) {
    this.payload = { childId };
  }
}

export type ActionsUnion = ModChildName | AddAnonymChild | DeleteChild;
