import { ComponentFixture } from '@angular/core/testing';

export function click<T>(fixture: ComponentFixture<T>, buttonClass: string) {
  fixture.nativeElement.querySelector('button.' + buttonClass).click();

  fixture.detectChanges();
}
