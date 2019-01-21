import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeListComponent } from './time-list.component';

import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../store/model';
import * as MyReducer from '../../store/reducers';

import { TEXT_INPUT_DEBOUNCE_TIME_MS } from '../const';

import {
  MatFormFieldModule, MatListModule, MatInputModule, MatCardModule,
  MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule,
  MatTableModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddDevice, ModDevice, DeleteDevice, AddAnonymChild, SetDeviceChild } from '../../store/actions';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';

describe('TimeListComponent', () => {
  let component: TimeListComponent;
  let fixture: ComponentFixture<TimeListComponent>;
  let reducerSpy: jasmine.Spy;
  let store: Store<State>;

  beforeEach(async(() => {
    reducerSpy = spyOn(MyReducer, 'reducer').and.callThrough();
    TestBed.configureTestingModule({
      declarations: [ TimeListComponent ],
      imports: [
        MatFormFieldModule,
        MatListModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatTableModule,
        [StoreModule.forRoot({ state: reducerSpy })],
        FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
    reducerSpy.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
