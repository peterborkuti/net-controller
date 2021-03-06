import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { DeviceListComponent } from './device-list.component';

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

import { click, dragElementViaTouch } from '../../utils/spec-utils';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;
  let reducerSpy: jasmine.Spy;
  let store: Store<State>;

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
        BrowserAnimationsModule,
        DragDropModule
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
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


  it('should use ActionTypes.ModDevice when user mods a device', <any>fakeAsync(() => {
    const name = 'xyz';
    const mac = '00:00:00:00:00:00';
    addDevice();

    component.devices.controls[0].setValue({id: 0, name: name, mac: mac, childId: 0});

    fixture.detectChanges();

    reducerSpy.calls.reset();

    tick(TEXT_INPUT_DEBOUNCE_TIME_MS);

    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new ModDevice(0, name, mac));
  }));

  it('should delete a device', () => {
    addDevice();

    expect(component.devices.controls.length).toBe(1);

    reducerSpy.calls.reset();

    const input = fixture.debugElement.query(By.css('input'));
    const dragElement = input.nativeElement;

    dragElementViaTouch(fixture, dragElement, 10, 0);

    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new DeleteDevice(0));
    expect(component.devices.controls.length).toBe(0);
  });

  it('should change a device-child relationship', <any>fakeAsync(() => {
    expect(store).toBeTruthy();
    expect(component.children.length).toBe(0);
    store.dispatch(new AddAnonymChild());
    store.dispatch(new AddAnonymChild());

    addDevice();

    fixture.detectChanges();

    expect(component.children.length).toBe(2);

    reducerSpy.calls.reset();

    component.devices.controls[0].setValue({id: 0, name: 'xyz', mac: '00:00:00:00:00:00', childId: 1});

    fixture.detectChanges();

    tick(TEXT_INPUT_DEBOUNCE_TIME_MS);

    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new SetDeviceChild(0, 1));
  }));
});
