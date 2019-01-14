import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildListComponent } from './child-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../store/model';
import * as MyReducer from '../../store/reducers';

import {
  MatFormFieldModule, MatListModule, MatInputModule, MatCardModule,
  MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule,
  MatTableModule
} from '@angular/material';
import { Mock } from 'protractor/built/driverProviders';
import { AddAnonymChild } from '../../store/actions';


describe('ChildListComponent', () => {
  let component: ChildListComponent;
  let fixture: ComponentFixture<ChildListComponent>;
  let reducerSpy: jasmine.Spy;

  beforeEach(async(() => {
    reducerSpy = spyOn(MyReducer, 'reducer');
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
      [StoreModule.forRoot({ state: reducerSpy })]
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use ActionTypes.AddAnonymChild when user adds a child', () => {
    const button = fixture.nativeElement.querySelector('button.add-child');

    button.click();

    expect(MyReducer.reducer).toHaveBeenCalledWith(undefined, new AddAnonymChild());
  });
});
