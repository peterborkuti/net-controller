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

import { AddAnonymChild, ModChildName, DeleteChild, AddDevice, ModDevice } from '../../store/actions';

import { FormsModule, ReactiveFormsModule, FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

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
    const button = fixture.nativeElement.querySelector('button.add-device');

    button.click();

    fixture.detectChanges();
  }

  it('should use ActionTypes.AddAnonymChild when user adds a child', () => {
    addDevice();
    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new AddDevice());
  });

  it('should add a new row when user adds a child', () => {
    expect(component.devices.controls.length).toBe(0);

    addDevice();

    expect(component.devices.controls.length).toBe(1);
  });


  it('should use ActionTypes.ModChildName when user mods a child', () => {
    addDevice();

    component.devices.controls[0].setValue({id: 0, name: 'xyz', mac: '123'});

    fixture.detectChanges();

    reducerSpy.calls.reset();

    const doneButton = fixture.nativeElement.querySelector('button.done');
    doneButton.click();

    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new ModDevice(0, 'xyz', '123'));
  });
});
