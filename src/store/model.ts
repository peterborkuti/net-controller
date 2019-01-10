import { createSelector } from '@ngrx/store';

import * as helper from './helper';
import { addDevice, modDevice } from './helper';

export const DEFAULT_ALLOCATED_TIME = 20;

export class Child {
  constructor(readonly id: number, readonly name: string) {}
}

export class Device {
  constructor(readonly id: number, readonly name: string, readonly mac: string) {}
}

export class ChildDevice {
  constructor(readonly childId: number, readonly deviceId: number) {}
}

export class DeviceTime {[deviceId: number]: number}

export const selectState = (globalState: any) => globalState.state;
export const selectChildren = createSelector(selectState, (state: State) => state.children);
export const selectDevices = createSelector(selectState, (state: State) => state.devices);
export const selectChildDevices = createSelector(selectState, (state: State) => state.childDevices);

export class State {
  constructor(
    readonly children: Child[] = [],
    readonly devices: Device[] = [],
    readonly childDevices: ChildDevice[] = [],
    readonly deviceTimes: DeviceTime = {},
    readonly defaultTime: number = DEFAULT_ALLOCATED_TIME
  ) {}

  deleteChild(childId: number): State {
    return helper.deleteChild(this, childId);
  }

  addAnonymChild(): State {
    return helper.addAnonymChild(this);
  }

  modChildName(childId: number, name: string): State {
    return helper.modChildName(this, childId, name);
  }

  addDeviceChild(): State {
    return this;
  }

  deleteDevice(deviceId: number): State {
    return helper.deleteDevice(this, deviceId);
  }

  addDevice(): State {
    return helper.addDevice(this);
  }

  modDevice(deviceId: number, name: string, mac: string): State {
    return helper.modDevice(this, deviceId, name, mac);
  }


}
