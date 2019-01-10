import { Action } from '@ngrx/store';

export enum ActionTypes {
  ModChildName = '[ChildList] Modify a child name',
  AddAnonymChild = '[ChildList] Add a new child without name',
  DeleteChild = '[ChildList] Delete a child',

  DeleteDevice = '[DeviceList] Delete a device',
  ModDevice = '[DeviceList] Modify a device',
  AddDevice = '[DeviceList] Add an empty device',

  SetDeviceChild = '[DeviceList] set a device-child relation'
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

export class ModDevice implements Action {
  readonly type = ActionTypes.ModDevice;
  readonly payload: { deviceId: number, name: string, mac: string };

  constructor(deviceId: number, name: string, mac: string) {
    this.payload = { deviceId, name, mac };
  }
}

export class AddDevice implements Action {
  readonly type = ActionTypes.AddDevice;
  readonly payload = {};
}

export class DeleteDevice implements Action {
  readonly type = ActionTypes.DeleteDevice;
  readonly payload: { deviceId: number };

  constructor(deviceId: number) {
    this.payload = { deviceId };
  }
}

export class SetDeviceChild implements Action {
  readonly type = ActionTypes.SetDeviceChild;
  readonly payload: { deviceId: number, childId: number };

  constructor(deviceId: number, childId: number) {
    this.payload = { deviceId, childId };
  }
}

export type ActionsUnion =  ModChildName | AddAnonymChild | DeleteChild |
                            AddDevice | ModDevice | DeleteDevice |
                            SetDeviceChild;
