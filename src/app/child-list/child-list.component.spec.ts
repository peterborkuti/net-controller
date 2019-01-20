import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ChildListComponent } from './child-list.component';
import { Store, StoreModule } from '@ngrx/store';

import * as MyReducer from '../../store/reducers';

import { click } from '../../utils/spec-utils';

import {
  MatFormFieldModule, MatListModule, MatInputModule, MatCardModule,
  MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule,
  MatTableModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { By } from '@angular/platform-browser';

import { AddAnonymChild, ModChildName, DeleteChild } from '../../store/actions';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TEXT_INPUT_DEBOUNCE_TIME_MS } from '../const';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {} from '@angular/material/'
import { element } from 'protractor';


describe('ChildListComponent', () => {
  let component: ChildListComponent;
  let fixture: ComponentFixture<ChildListComponent>;
  let reducerSpy: jasmine.Spy;

  beforeEach(async(() => {
    reducerSpy = spyOn(MyReducer, 'reducer').and.callThrough();
    TestBed.configureTestingModule({
      declarations: [ ChildListComponent ],
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
    fixture = TestBed.createComponent(ChildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    reducerSpy.calls.reset();
  });

  function addChild(): void {
    click(fixture, 'add-child');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use ActionTypes.AddAnonymChild when user adds a child', () => {
    addChild();
    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new AddAnonymChild());
  });

  it('should add a new row when user adds a child', () => {
    expect(component.children.controls.length).toBe(0);

    addChild();

    expect(component.children.controls.length).toBe(1);
  });


  it('should use ActionTypes.ModChildName when user mods a child', <any>fakeAsync((): void =>  {
    addChild();

    component.children.controls[0].setValue({id: 0, name: 'xyz'});

    fixture.detectChanges();

    reducerSpy.calls.reset();

    tick(TEXT_INPUT_DEBOUNCE_TIME_MS);

    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new ModChildName(0, 'xyz'));
  }));

  it('should delete via drag', () => {
    addChild();
    expect(component.children.controls.length).toBe(1);

    reducerSpy.calls.reset();

    const input = fixture.debugElement.query(By.css('input'));
    const dragElement = input.nativeElement;

    dragElementViaTouch(fixture, dragElement, 10, 0);

    fixture.detectChanges();

    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new DeleteChild(0));
    expect(component.children.controls.length).toBe(0);
  });
});



/** Creates a browser MouseEvent with the specified options. */
export function createMouseEvent(type: string, x = 0, y = 0, button = 0) {
  const event = document.createEvent('MouseEvent');

  event.initMouseEvent(type,
    true, /* canBubble */
    false, /* cancelable */
    window, /* view */
    0, /* detail */
    x, /* screenX */
    y, /* screenY */
    x, /* clientX */
    y, /* clientY */
    false, /* ctrlKey */
    false, /* altKey */
    false, /* shiftKey */
    false, /* metaKey */
    button, /* button */
    null /* relatedTarget */);

  // `initMouseEvent` doesn't allow us to pass the `buttons` and
  // defaults it to 0 which looks like a fake event.
  Object.defineProperty(event, 'buttons', {get: () => 1});

  return event;
}

/** Shorthand to dispatch a mouse event on the specified coordinates. */
export function dispatchMouseEvent(node: Node, type: string, x = 0, y = 0,
  event = createMouseEvent(type, x, y)): MouseEvent {
  return dispatchEvent(node, event) as MouseEvent;
}

/** Utility to dispatch any event on a Node. */
export function dispatchEvent(node: Node | Window, event: Event): Event {
  node.dispatchEvent(event);
  return event;
}

/**
 * Dispatches the events for starting a drag sequence.
 * @param fixture Fixture on which to run change detection.
 * @param element Element on which to dispatch the events.
 * @param x Position along the x axis to which to drag the element.
 * @param y Position along the y axis to which to drag the element.
 */
function startDraggingViaMouse(fixture: ComponentFixture<any>,
  element: Element, x?: number, y?: number) {
  dispatchMouseEvent(element, 'mousedown', x, y);
  fixture.detectChanges();

  dispatchMouseEvent(document, 'mousemove', x, y);
  fixture.detectChanges();
}

/**
 * Drags an element to a position on the page using a touch device.
 * @param fixture Fixture on which to run change detection.
 * @param element Element which is being dragged.
 * @param x Position along the x axis to which to drag the element.
 * @param y Position along the y axis to which to drag the element.
 */
function dragElementViaTouch(fixture: ComponentFixture<any>,
  element: Element, x: number, y: number) {

dispatchTouchEvent(element, 'touchstart');
fixture.detectChanges();

dispatchTouchEvent(document, 'touchmove');
fixture.detectChanges();

dispatchTouchEvent(document, 'touchmove', x, y);
fixture.detectChanges();

dispatchTouchEvent(document, 'touchend', x, y);
fixture.detectChanges();
}

/** Shorthand to dispatch a touch event on the specified coordinates. */
export function dispatchTouchEvent(node: Node, type: string, x = 0, y = 0) {
  return dispatchEvent(node, createTouchEvent(type, x, y));
}

/** Creates a browser TouchEvent with the specified pointer coordinates. */
export function createTouchEvent(type: string, pageX = 0, pageY = 0) {
  // In favor of creating events that work for most of the browsers, the event is created
  // as a basic UI Event. The necessary details for the event will be set manually.
  const event = document.createEvent('UIEvent');
  const touchDetails = {pageX, pageY};

  event.initUIEvent(type, true, true, window, 0);

  // Most of the browsers don't have a "initTouchEvent" method that can be used to define
  // the touch details.
  Object.defineProperties(event, {
    touches: {value: [touchDetails]},
    targetTouches: {value: [touchDetails]},
    changedTouches: {value: [touchDetails]}
  });

  return event;
}
