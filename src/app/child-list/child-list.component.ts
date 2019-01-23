import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { State, Child, FlatDictionary } from '../../store/model';
import { selectFlatChildren } from '../../store/selectors';

import { DeleteChild, AddAnonymChild, ModChildName } from '../../store/actions';

import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { TEXT_INPUT_DEBOUNCE_TIME_MS, NAME_SIZE } from '../const';

import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit {
  INPUT_LENGTH = NAME_SIZE;
  children$: Observable<FlatDictionary<Child>[]>;

  form: FormGroup = new FormGroup({
    children: new FormArray([])
  });

  private modChildSubscribers: Subscription[] = [];

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.children$ = store.pipe(select(selectFlatChildren));

    this.children$.subscribe((children) => {
      // unsubscribe
      this.modChildSubscribers.forEach(s => s.unsubscribe());

      // remove items
      const items = this.children;
      while (items.length > 0) {items.removeAt(0); }

      // add new items
      children.map(child => new FormGroup(
        {
          id: new FormControl(child.id),
          name: new FormControl(child.e.name, [Validators.maxLength(NAME_SIZE), Validators.required])
        })
      ).
      forEach(g => {
        items.push(g);
      });

      // subscribe
      this.modChildSubscribers =
        items.controls.map(c =>
          c.valueChanges.pipe(debounceTime(TEXT_INPUT_DEBOUNCE_TIME_MS), distinctUntilChanged()).
          subscribe(value => this.onModChild(c, value)));
    });
  }

  ngOnInit() {
  }

  get children(): FormArray { return this.form.get('children') as FormArray; }

  onModChild(control: AbstractControl, child: {id: number, name: any}): void {
    const group = control as FormGroup;
    const name = group.controls['name'];
    name.updateValueAndValidity();

    if (name.valid) {
      this.store.dispatch(new ModChildName(child.id, child.name));
    } else {
      console.log('invalid');
    }
  }

  onAddNewItem() {
    this.store.dispatch(new AddAnonymChild());
  }

  onDeleteChild(childId: number) {
    this.store.dispatch(new DeleteChild(childId));
  }

}
