import { Component, OnInit } from '@angular/core';

import { Store, select  } from '@ngrx/store';
import { State, Child, FlatDictionary, DeviceChildDisplay } from '../../store/model';

import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DeleteDevice, ModDevice, AddDevice, SetDeviceChild } from '../../store/actions';
import { selectFlatChildren, selectDeviceChildDisplay } from '../../store/selectors';

import { FormArray, FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { TEXT_INPUT_DEBOUNCE_TIME_MS, NAME_SIZE, MAC_REGEXP, MAC_SIZE } from '../const';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  NAME_LENGTH = NAME_SIZE;
  MAC_LENGTH = MAC_SIZE;
  MAC_PATTERN = MAC_REGEXP;

  macReg = RegExp(MAC_REGEXP);

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
          subscribe(value => this.onSaveChanges(c, value)));
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

  onSaveChanges(control: AbstractControl, device: DeviceChildDisplay) {
    const group = control as FormGroup;
    const err = {};

    const nameControl = group.controls['name'];
    const name = nameControl.value;

    if (name.length > NAME_SIZE) {
      err['size'] = 'Name is too long';
      nameControl.setErrors(err);
    }

    const macControl = group.controls['mac'];
    const mac = macControl.value;

    if (!mac || !this.macReg.test(mac)) {
      err['mac'] = 'Mac address invalid';
      macControl.setErrors(err);
    }

    if (Object.keys(err).length === 0) {
      this.store.dispatch(new ModDevice(device.id, device.name, device.mac));
      if (device.childId || device.childId === 0) {
        this.store.dispatch(new SetDeviceChild(device.id, device.childId));
      }
    }

  }

  onAddNewDeviceChild() {
    this.store.dispatch(new AddDevice());
  }

}
