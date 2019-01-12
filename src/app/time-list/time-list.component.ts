import { Component, OnInit } from '@angular/core';


import { DEVICES } from '../../mocks/devices';
import { CHILDREN } from '../../mocks/children';
import { DEVICETIMES } from '../../mocks/time';

export interface DataSource {
    deviceId: number;
    deviceName: string;
    allocatedTime: number;
    addExtraTime: number;
    remaining: number;
}


@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnInit {
  children = CHILDREN;
  devices = DEVICES;
  deviceTimes = DEVICETIMES;
  remainingTime = {};

  dataSource: DataSource[];
  displayedColumns: string[] = ['deviceName', 'allocatedTime', 'addExtraTime', 'remaining'];

  constructor() { }

  ngOnInit() {
    this.dataSource = Object.keys(this.devices).map(did => +did).map(
        did => (
          {
            deviceId: did,
            deviceName: this.devices[did].name,
            allocatedTime: this.deviceTimes[did],
            addExtraTime: did,
            remaining: 0
          }));

  }

  onTimeChange(deviceId: number, value: number) {
    console.log('onTimeChange', deviceId, value);
  }

  onAddExtraTime(deviceId: number) {
    console.log('addExtraTime', deviceId);
  }

}
