import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListComponent } from './device-list.component';

import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../store/model';
import * as MyReducer from '../../store/reducers';

import {
  MatFormFieldModule, MatListModule, MatInputModule, MatCardModule,
  MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule,
  MatTableModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddDevice, ModDevice, DeleteDevice } from '../../store/actions';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { click } from '../../utils/spec-utils';

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;
  let reducerSpy: jasmine.Spy;

  beforeEach(async(() => {
    reducerSpy = spyOn(MyReducer, 'reducer').and.callThrough();
    TestBed.configureTestingModule({
      declarations: [ DeviceListComponent ],
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
    fixture = TestBed.createComponent(DeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    reducerSpy.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function addDevice(): void {
    click(fixture, 'add-device');
  }

  it('should use ActionTypes.AddDevice when user adds a device', () => {
    addDevice();
    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new AddDevice());
  });

  it('should add a new row when user adds a device', () => {
    expect(component.devices.controls.length).toBe(0);

    addDevice();

    expect(component.devices.controls.length).toBe(1);
  });


  it('should use ActionTypes.ModDevice when user mods a device', () => {
    addDevice();

    component.devices.controls[0].setValue({id: 0, name: 'xyz', mac: '123'});

    fixture.detectChanges();

    reducerSpy.calls.reset();

    click(fixture, 'done');

    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new ModDevice(0, 'xyz', '123'));
  });

  it('should delete a device', () => {
    addDevice();

    expect(component.devices.controls.length).toBe(1);

    reducerSpy.calls.reset();

    click(fixture, 'delete');

    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new DeleteDevice(0));
    expect(component.devices.controls.length).toBe(0);
  });
});
