import { createSelector } from '@ngrx/store';

import * as helper from './helper';

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

export class State {
  constructor(
    readonly children: Child[] = [],
    readonly devices: Device[] = [],
    readonly childDevices: ChildDevice[] = [],
    readonly deviceTimes: DeviceTime = {},
    readonly defaultTime: number = DEFAULT_ALLOCATED_TIME
  ) {}

  deleteChild(childId: number): State {
    const newDeviceTime: DeviceTime = Object.assign({}, this.deviceTimes);

    for (const deviceId in newDeviceTime) {
      if (newDeviceTime[deviceId] === childId) {
        delete newDeviceTime[deviceId];
      }
    }

    return new State(
      this.children.filter(child => child.id !== childId),
      this.devices,
      this.childDevices.filter(childDevice => childDevice.childId !== childId),
      newDeviceTime,
      this.defaultTime
    );
  }

  addAnonymChild(): State {
    const newId = helper.getNewId(this.children);
    const newChildren: Child[] = this.children.slice();

    newChildren.push(new Child(newId, ''));

    return new State(
      newChildren,
      this.devices,
      this.childDevices,
      this.deviceTimes,
      this.defaultTime
    );
  }

modChildName(childId: number, name: string): State {
    const newChildren: Child[] =
      this.children.map(
        child => child.id === childId ? new Child(childId, name) : child
      );

      return new State(
      newChildren,
      this.devices,
      this.childDevices,
      this.deviceTimes,
      this.defaultTime
    );
  }
}
