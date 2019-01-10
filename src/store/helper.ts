import { DeviceTime, State, Child, Device } from './model';
/**
 * It returns with an id for using when adding new element to the input array.
 *
 * The input array should contain elements, which has an "id" (number) property
 * @param arr array of elements {id:number, ...}
 */
function getNewId(arr: any[]): number {
  const maxId = Math.max.apply(null, arr.map(e => e.id));
  const newId: number = maxId === -Infinity ? 0 : maxId + 1;

  return newId;
}

function deleteChildFromDeviceTime(childId: number, deviceTimes: DeviceTime) {
  const newDeviceTime: DeviceTime = Object.assign({}, deviceTimes);

  for (const deviceId in newDeviceTime) {
    if (newDeviceTime[deviceId] === childId) {
      delete newDeviceTime[deviceId];
    }
  }

  return newDeviceTime;
}

function deleteDeviceFromDeviceTime(deviceId: number, deviceTimes: DeviceTime) {
  const newDeviceTime: DeviceTime = Object.assign({}, deviceTimes);
  delete newDeviceTime[deviceId];

  return newDeviceTime;
}

export function deleteChild(state: State, childId: number): State {
  return new State(
    state.children.filter(child => child.id !== childId),
    state.devices,
    state.childDevices.filter(childDevice => childDevice.childId !== childId),
    deleteChildFromDeviceTime(childId, state.deviceTimes),
    state.defaultTime
  );
}

export function addAnonymChild(state: State): State {
  const newId = getNewId(state.children);
  const newChildren: Child[] = state.children.slice();

  newChildren.push(new Child(newId, ''));

  return new State(
    newChildren,
    state.devices,
    state.childDevices,
    state.deviceTimes,
    state.defaultTime
  );
}

export function modChildName(state: State, childId: number, name: string): State {
  const newChildren: Child[] =
    state.children.map(
      child => child.id === childId ? new Child(childId, name) : child
    );

    return new State(
    newChildren,
    state.devices,
    state.childDevices,
    state.deviceTimes,
    state.defaultTime
  );
}

export function deleteDevice(state: State, deviceId: number): State {
  return new State(
    state.children,
    state.devices.filter(device => device.id !== deviceId),
    state.childDevices.filter(childDevice => childDevice.deviceId !== deviceId),
    deleteDeviceFromDeviceTime(deviceId, state.deviceTimes),
    state.defaultTime
  );
}

export function addDevice(state: State): State {
  const newId = getNewId(state.devices);
  const newDevices: Device[] = state.devices.slice();

  newDevices.push(new Device(newId, '', ''));

  return new State(
    state.children,
    newDevices,
    state.childDevices,
    state.deviceTimes,
    state.defaultTime
  );
}

export function modDevice(state: State, deviceId: number, name: string, mac: string): State {
  const newDevices: Device[] =
    state.devices.map(
      d => d.id === deviceId ? new Device(deviceId, name, mac) : d
    );

    return new State(
    state.children,
    newDevices,
    state.childDevices,
    state.deviceTimes,
    state.defaultTime
  );
}
