import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { TimeListComponent } from './time-list.component';

import { Store, StoreModule } from '@ngrx/store';
import { State, AllocatedTime } from '../../store/model';
import * as MyReducer from '../../store/reducers';

import { TEXT_INPUT_DEBOUNCE_TIME_MS } from '../const';

import {
  MatFormFieldModule, MatListModule, MatInputModule, MatCardModule,
  MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule,
  MatTableModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddDevice, ModDevice, SetAllocatedTime, AddExtraTime } from '../../store/actions';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  it('should display devices', () => {
    expect(component.dataSource.length).toBe(0);
    store.dispatch(new AddDevice());

    fixture.detectChanges();

    expect(component.dataSource.length).toBe(1);

    const device = {name: 'device1', mac: '10:20:A0:B0'};

    store.dispatch(new ModDevice(0, device.name, device.mac));

    fixture.detectChanges();

    expect(component.dataSource[0].device).toEqual(device);

    const element: HTMLElement = fixture.debugElement.nativeElement;
    const td = element.querySelector('td');
    expect(td.textContent).toContain(device.name);
  });

  it('should display allocated time from store', () => {
    const time = '10';

    store.dispatch(new AddDevice());
    store.dispatch(new SetAllocatedTime(0, +time));

    fixture.detectChanges();

    const element: HTMLElement = fixture.debugElement.nativeElement;
    const input = element.querySelector('input');
    expect(input.value).toContain(time);
  });

  it('should display remaining time from store', () => {
    store.dispatch(new AddDevice());
    store.dispatch(new AddExtraTime(0));

    fixture.detectChanges();

    const element: HTMLElement = fixture.debugElement.nativeElement;
    const td = element.querySelectorAll('td');
    expect(td[2].textContent).toContain('1');
  });

  it('should add extra time', () => {
    store.dispatch(new AddDevice());

    fixture.detectChanges();

    reducerSpy.calls.reset();

    const element: HTMLElement = fixture.debugElement.nativeElement;
    const button = element.querySelector('button');
    button.click();

    fixture.detectChanges();

    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new AddExtraTime(0));
  });

  it('should store user-set allocated time when using FromControl layer',  <any>fakeAsync(() => {
    const allocatedTime = AllocatedTime.getTime(0, 10);

    store.dispatch(new AddDevice());

    fixture.detectChanges();

    reducerSpy.calls.reset();

    component.dataSource[0].formGroup.setValue(allocatedTime);

    fixture.detectChanges();

    tick(TEXT_INPUT_DEBOUNCE_TIME_MS);

    expect(MyReducer.reducer).
      toHaveBeenCalledWith(
        jasmine.anything(),
        new SetAllocatedTime(allocatedTime.id, allocatedTime.allocatedTime)
      );
  }));

  it('should store user-set allocated time when using html input layer',  <any>fakeAsync(() => {
    const allocatedTime = AllocatedTime.getTime(0, 10);

    store.dispatch(new AddDevice());

    fixture.detectChanges();

    reducerSpy.calls.reset();

    component.dataSource[0].formGroup.setValue(allocatedTime);
    const element: HTMLElement = fixture.debugElement.nativeElement;
    const input = element.querySelector('input');

    const e: Event = document.createEvent('Event');
    e.initEvent('input', false, false);

    input.value = '' + allocatedTime.allocatedTime;
    input.dispatchEvent(e);

    fixture.detectChanges();

    tick(TEXT_INPUT_DEBOUNCE_TIME_MS);

    expect(MyReducer.reducer).
      toHaveBeenCalledWith(
        jasmine.anything(),
        new SetAllocatedTime(allocatedTime.id, allocatedTime.allocatedTime)
      );
  }));
});
