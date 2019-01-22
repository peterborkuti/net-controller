import { selectDeviceTimeDisplay } from './selectors';

import { FormGroup, FormBuilder } from '@angular/forms';

export const DEFAULT_ALLOCATED_TIME = 20;

export type ChildId = number;
export type DeviceId = number;

export interface Child {
  name: string;
}

export interface Device {
  name: string;
  mac: string;
}

export interface Time {
  allocated: number;
  remaining: number;
}

export interface Dictionary<T> {
  [index: number]: T;
}

export interface FlatDictionary<T> {
  id: number;
  e: T;
}

export interface Children extends Dictionary<Child> {}

export interface Devices extends Dictionary<Device> {}

export interface DeviceChild extends Dictionary<ChildId> {}

export interface DeviceTime extends Dictionary<Time> {}

export interface DeviceTimeDisplay {
  id: DeviceId;
  device: Device;
  allocatedTime: number;
  remainingTime: number;
}

export interface DeviceTimeDisplayForm extends DeviceTimeDisplay {
  formGroup: FormGroup;
}

export class AllocatedTime {
  static getTime(id: number, allocatedTime: number) {
    return {id, allocatedTime};
  }

  static getControl(device: DeviceTimeDisplay, fb: FormBuilder): FormGroup {
    return fb.group({id: device.id, allocatedTime: device.allocatedTime});
  }
}

export interface DeviceChildDisplay {
  id: DeviceId;
  name: string;
  mac: string;
  childId: ChildId;
}

export interface State {
  children: Children;
  devices: Devices;
  deviceChild: DeviceChild;
  deviceTime: DeviceTime;
  defaultTime: number;
}

export const DEFAULT_STATE: State = {
  children: [],
  devices: [],
  deviceChild: {},
  deviceTime: {},
  defaultTime: DEFAULT_ALLOCATED_TIME
};
