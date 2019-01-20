import { ComponentFixture } from '@angular/core/testing';

export function click<T>(fixture: ComponentFixture<T>, buttonClass: string) {
  fixture.nativeElement.querySelector('button.' + buttonClass).click();

  fixture.detectChanges();
}

/**
 * The code below is from material2/src/cdk/drag-drop/directives/drag.spec.ts
 */

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
  el: Element, x?: number, y?: number) {
  dispatchMouseEvent(el, 'mousedown', x, y);
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
export function dragElementViaTouch(fixture: ComponentFixture<any>,
  el: Element, x: number, y: number) {

dispatchTouchEvent(el, 'touchstart');
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

