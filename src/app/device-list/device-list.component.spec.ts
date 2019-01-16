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

import { AddAnonymChild, ModChildName, DeleteChild } from '../../store/actions';

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
});
