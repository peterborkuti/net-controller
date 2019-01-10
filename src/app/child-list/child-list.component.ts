import { Component, OnInit } from '@angular/core';
import { CHILDREN } from '../../mocks/children';
import { ChildrenOutletContexts } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { State, Child, selectChildren } from '../../store/model';
import { DeleteChild, AddAnonymChild } from '../../store/actions';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit {

  children$: Observable<Child[]>;

  empty = '';

  constructor(private store: Store<State>) {
    this.children$ = store.pipe(select(selectChildren));
  }

  ngOnInit() {
  }

  onChange(name: string) {
    console.log(name);
  }

  onAddNewItem() {
    const action = new AddAnonymChild();
    console.log('onAddNewItem', action);

    this.store.dispatch(action);
  }

  onDeleteChild(childId: number) {
    this.store.dispatch(new DeleteChild(childId));
  }

}
