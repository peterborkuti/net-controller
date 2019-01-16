import { Component, OnInit } from '@angular/core';
import { CHILDREN } from '../../mocks/children';
import { ChildrenOutletContexts } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { State, Child, FlatDictionary } from '../../store/model';
import { selectFlatChildren } from '../../store/selectors';

import { DeleteChild, AddAnonymChild, ModChildName } from '../../store/actions';

import { Observable } from 'rxjs';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.children$ = store.pipe(select(selectFlatChildren));

    this.children$.subscribe((children) => {
      const items = this.children;
      while (items.length > 0) {items.removeAt(0); }
      this.buildFormControlArray(children).forEach(g => items.push(g));
    });
  }

  ngOnInit() {
  }

  get children(): FormArray { return this.form.get('children') as FormArray; }

  buildFormControlArray(children: FlatDictionary<Child>[]): FormGroup[] {
    return children.map(child => this.formBuilder.group({id: child.id, name: child.e.name}));
  }

  onModName(childId: number, name: string) {
    this.store.dispatch(new ModChildName(childId, name));
  }

  onAddNewItem() {
    this.store.dispatch(new AddAnonymChild());
  }

  onDeleteChild(childId: number) {
    this.store.dispatch(new DeleteChild(childId));
  }

}
