import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { State, Child, FlatDictionary } from '../../store/model';
import { selectFlatChildren } from '../../store/selectors';

import { DeleteChild, AddAnonymChild, ModChildName } from '../../store/actions';

import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TEXT_INPUT_DEBOUNCE_TIME_MS } from '../const';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit {
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
      children.map(child => this.formBuilder.group({id: child.id, name: child.e.name})).
      forEach(g => items.push(g));

      // subscribe
      this.modChildSubscribers =
        items.controls.map(c =>
          c.valueChanges.pipe(debounceTime(TEXT_INPUT_DEBOUNCE_TIME_MS), distinctUntilChanged()).
          subscribe(value => this.onModChild(value)));
    });
  }

  ngOnInit() {
  }

  get children(): FormArray { return this.form.get('children') as FormArray; }

  onModChild(child: {id: number, name: string}): void {
    this.store.dispatch(new ModChildName(child.id, child.name));
  }

  onAddNewItem() {
    this.store.dispatch(new AddAnonymChild());
  }

  onDeleteChild(childId: number) {
    this.store.dispatch(new DeleteChild(childId));
  }

}
