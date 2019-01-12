import { Component, OnInit } from '@angular/core';

import { Store, select  } from '@ngrx/store';
import { State, Child, FlatDictionary, Device, DeviceTimeDisplay} from '../../store/model';

import { Observable } from 'rxjs';
import { SetAllocatedTime, AddExtraTime } from '../../store/actions';
import { selectDeviceTimeDisplay, selectFlatDevices } from '../../store/selectors';


import { DEVICES } from '../../mocks/devices';
import { CHILDREN } from '../../mocks/children';
import { DEVICETIMES } from '../../mocks/time';
import { DEVICETIMEDISPLAY } from '../../mocks/devicetimedisplay';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnInit {
  devices = DEVICES;
  deviceTimes = DEVICETIMES;
  remainingTime = {};
  devices$: Observable<FlatDictionary<Device>[]>;
  deviceTimeDisplay$: Observable<DeviceTimeDisplay[]>;


  dataSource: DeviceTimeDisplay[];
  displayedColumns: string[] = ['deviceName', 'allocatedTime', 'addExtraTime', 'remainingTime' ];

  constructor(private store: Store<State>) {
    this.deviceTimeDisplay$ = store.pipe(select(selectDeviceTimeDisplay));

    this.deviceTimeDisplay$.subscribe((ds) => this.dataSource = ds);
   }

  ngOnInit() {
  }

  onAddExtraTime(deviceId: number) {
    this.store.dispatch(new AddExtraTime(deviceId));
    console.log('addExtraTime', deviceId);
  }

  onModAllocatedTime(deviceId: number, allocatedTime: number) {
    this.store.dispatch(new SetAllocatedTime(deviceId, allocatedTime));
  }

}
