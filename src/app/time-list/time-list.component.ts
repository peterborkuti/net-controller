import { Component, OnInit } from '@angular/core';

import { Store, select  } from '@ngrx/store';
import { State, DeviceTimeDisplay} from '../../store/model';

import { Observable } from 'rxjs';
import { SetAllocatedTime, AddExtraTime } from '../../store/actions';
import { selectDeviceTimeDisplay } from '../../store/selectors';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnInit {
  deviceTimeDisplay$: Observable<DeviceTimeDisplay[]>;

  dataSource: DeviceTimeDisplay[];
  displayedColumns: string[] = ['deviceName', 'allocatedTime', 'remainingTime', 'addExtraTime' ];

  constructor(private store: Store<State>) {
    this.deviceTimeDisplay$ = store.pipe(select(selectDeviceTimeDisplay));

    this.deviceTimeDisplay$.subscribe((ds) => this.dataSource = ds);
   }

  ngOnInit() {
  }

  onAddExtraTime(deviceId: number) {
    this.store.dispatch(new AddExtraTime(deviceId));
  }

  onModAllocatedTime(deviceId: number, allocatedTime: number) {
    this.store.dispatch(new SetAllocatedTime(deviceId, allocatedTime));
  }

}
