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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Mock } from 'protractor/built/driverProviders';
import { AddAnonymChild, ModChildName, DeleteChild } from '../../store/actions';

import { FormsModule, ReactiveFormsModule, FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';


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
      BrowserAnimationsModule
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
    const button = fixture.nativeElement.querySelector('button.add-child');

    button.click();

    fixture.detectChanges();
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


  it('should use ActionTypes.ModChildName when user mods a child', () => {
    addChild();

    component.children.controls[0].setValue({id: 0, name: 'xyz'});

    fixture.detectChanges();

    reducerSpy.calls.reset();

    const doneButton = fixture.nativeElement.querySelector('button.done');
    doneButton.click();

    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new ModChildName(0, 'xyz'));
  });

  it('should delete', () => {
    addChild();

    reducerSpy.calls.reset();

    const deleteButton = fixture.nativeElement.querySelector('button.delete');
    deleteButton.click();

    expect(MyReducer.reducer).toHaveBeenCalledWith(jasmine.anything(), new DeleteChild(0));

    fixture.detectChanges();

    expect(component.children.controls.length).toBe(0);
  });
});
