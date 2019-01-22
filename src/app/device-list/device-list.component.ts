import { Component, OnInit } from '@angular/core';

import { Store, select  } from '@ngrx/store';
import { State, Child, FlatDictionary, DeviceChild, DeviceChildDisplay } from '../../store/model';

import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DeleteDevice, ModDevice, AddDevice, SetDeviceChild } from '../../store/actions';
import { selectFlatChildren, selectDeviceChild, selectDeviceChildDisplay } from '../../store/selectors';

import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TEXT_INPUT_DEBOUNCE_TIME_MS } from '../const';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  children$: Observable<FlatDictionary<Child>[]>;
  devices$: Observable<DeviceChildDisplay[]>;

  children: FlatDictionary<Child>[];

  private subscribers: Subscription[] = [];

  form: FormGroup = new FormGroup({
    devices: new FormArray([])
  });

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.children$ = store.pipe(select(selectFlatChildren));
    this.devices$ = store.pipe(select(selectDeviceChildDisplay));

    this.children$.subscribe(children => this.children = children);

    this.devices$.subscribe((devices) => {

      // unsubscribe
      this.subscribers.forEach(s => s.unsubscribe());

      // remove items
      const items = this.devices;
      while (items.length > 0) {items.removeAt(0); }

      // add new items
      devices.map(device => this.formBuilder.group(device)).
      forEach(g => items.push(g));

      // subscribe
      this.subscribers =
        items.controls.map(c =>
          c.valueChanges.pipe(debounceTime(TEXT_INPUT_DEBOUNCE_TIME_MS), distinctUntilChanged()).
          subscribe(value => this.onSaveChanges(value)));
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

  onSaveChanges(device: DeviceChildDisplay) {
    this.store.dispatch(new ModDevice(device.id, device.name, device.mac));
    this.store.dispatch(new SetDeviceChild(device.id, device.childId));
  }

  onAddNewDeviceChild() {
    this.store.dispatch(new AddDevice());
  }

}
