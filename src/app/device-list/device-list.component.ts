import { Component, OnInit } from '@angular/core';

import { Store, select  } from '@ngrx/store';
import { State, Child, FlatDictionary, Device, DeviceChild} from '../../store/model';

import { Observable } from 'rxjs';
import { DeleteDevice, ModDevice, AddDevice, SetDeviceChild } from '../../store/actions';
import { selectFlatChildren, selectDeviceChild, selectFlatDevices } from '../../store/selectors';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  children$: Observable<FlatDictionary<Child>[]>;
  devices$: Observable<FlatDictionary<Device>[]>;
  deviceChild$: Observable<DeviceChild>;

  constructor(private store: Store<State>) {
    this.children$ = store.pipe(select(selectFlatChildren));
    this.devices$ = store.pipe(select(selectFlatDevices));
    this.deviceChild$ = store.pipe(select(selectDeviceChild));
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
