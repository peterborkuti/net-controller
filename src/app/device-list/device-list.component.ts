import { Component, OnInit } from '@angular/core';

import { Store, select  } from '@ngrx/store';
import { State, Child, FlatDictionary, Device, DeviceChild, DeviceChildDisplay } from '../../store/model';

import { Observable } from 'rxjs';
import { DeleteDevice, ModDevice, AddDevice, SetDeviceChild } from '../../store/actions';
import { selectFlatChildren, selectDeviceChild, selectFlatDevices, selectDeviceChildDisplay } from '../../store/selectors';

import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  children$: Observable<FlatDictionary<Child>[]>;
  devices$: Observable<DeviceChildDisplay[]>;
  deviceChild$: Observable<DeviceChild>;

  children: FlatDictionary<Child>[];

  form: FormGroup = new FormGroup({
    devices: new FormArray([])
  });

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.children$ = store.pipe(select(selectFlatChildren));
    this.devices$ = store.pipe(select(selectDeviceChildDisplay));
    this.deviceChild$ = store.pipe(select(selectDeviceChild));

    this.children$.subscribe(children => this.children = children);

    this.devices$.subscribe((devices) => {
      const items = this.devices;
      while (items.length > 0) {items.removeAt(0); }
      this.buildFormControlArray(devices).forEach(g => items.push(g));
      console.log('devices:', items);
    });
   }

   buildFormControlArray(devices: DeviceChildDisplay[]): FormGroup[] {
    return devices.map(device => this.formBuilder.group(device));
  }

  ngOnInit() {
  }

  get devices(): FormArray { return this.form.get('devices') as FormArray; }

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
