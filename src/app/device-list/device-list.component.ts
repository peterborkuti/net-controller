import { Component, OnInit } from '@angular/core';
import { DEVICES } from '../../mocks/devices';
import { CHILDREN } from '../../mocks/children';

import { Store, select  } from '@ngrx/store';
import { State, Child, Device, selectChildren, selectDevices, ChildDevice, selectChildDevices } from '../../store/model';

import { Observable } from 'rxjs';
import { DeleteDevice, ModDevice, AddDevice, SetDeviceChild } from '../../store/actions';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  children$: Observable<Child[]>;
  devices$: Observable<Device[]>;
  childDevices$: Observable<ChildDevice[]>;
  children = CHILDREN;
  devices = DEVICES;


  constructor(private store: Store<State>) {
    this.children$ = store.pipe(select(selectChildren));
    this.devices$ = store.pipe(select(selectDevices));
    this.childDevices$ = store.pipe(select(selectChildDevices));
   }

  ngOnInit() {
  }

  onDeleteDevice(deviceId: number) {
    this.store.dispatch(new DeleteDevice(deviceId));
  }

  onSaveChanges(deviceId: number, deviceName: string, deviceMac: string) {
    this.store.dispatch(new ModDevice(deviceId, deviceName, deviceMac));
  }

  onAddNewDeviceChild() {
    this.store.dispatch(new AddDevice());
  }

  onSetDeviceChild(deviceId: number, childId: number) {
    this.store.dispatch(new SetDeviceChild(deviceId, childId));
  }


}
