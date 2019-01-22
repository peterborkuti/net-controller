import { Component, OnInit } from '@angular/core';

import { Store, select  } from '@ngrx/store';
import { State, DeviceTimeDisplay, DeviceTimeDisplayForm, DeviceId, AllocatedTime } from '../../store/model';

import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SetAllocatedTime, AddExtraTime } from '../../store/actions';
import { selectDeviceTimeDisplay } from '../../store/selectors';

import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TEXT_INPUT_DEBOUNCE_TIME_MS } from '../const';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnInit {
  deviceTimeDisplay$: Observable<DeviceTimeDisplay[]>;

  dataSource: DeviceTimeDisplayForm[];
  displayedColumns: string[] = ['deviceName', 'allocatedTime', 'remainingTime', 'addExtraTime' ];

  private subscribers: Subscription[] = [];

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.deviceTimeDisplay$ = store.pipe(select(selectDeviceTimeDisplay));

    this.deviceTimeDisplay$.subscribe((ds) => {

      // unsubscribe
      this.subscribers.forEach(s => s.unsubscribe());

      // add new items
      this.dataSource = ds.map(device => {
        const formGroup = AllocatedTime.getControl(device, this.formBuilder);

        return {...device, formGroup: formGroup};
      });

      // subscribe
      this.subscribers =
        this.dataSource.map(d =>
          d.formGroup.valueChanges.pipe(debounceTime(TEXT_INPUT_DEBOUNCE_TIME_MS), distinctUntilChanged()).
          subscribe(value => this.onModAllocatedTime(value)));
    });
   }

  ngOnInit() {
  }

  onAddExtraTime(deviceId: number) {
    this.store.dispatch(new AddExtraTime(deviceId));
  }

  onModAllocatedTime(value: {id: number, allocatedTime: number}) {
    this.store.dispatch(new SetAllocatedTime(value.id, +value.allocatedTime));
  }

}
