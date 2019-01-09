export class Child {
  constructor(readonly id: number, readonly name: string) {}
}

export class Device {
  constructor(readonly id: number, readonly name: string, readonly mac: string) {}
}

export class ChildDevice {
  constructor(readonly childId: number, readonly deviceId: number) {}
}

export class DeviceTime {
  constructor(readonly deviceId: number, readonly time: number) {}
}

export class State {
  constructor(
    readonly children: Child[],
    readonly devices: Device[],
    readonly childDevices: ChildDevice[],
    readonly deviceTimes: DeviceTime[],
    readonly defaultTime: number
  ) {}
}
