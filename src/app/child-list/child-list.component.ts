import { Component, OnInit } from '@angular/core';
import { CHILDREN } from '../../mocks/children';
import { ChildrenOutletContexts } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { State, Child, selectChildren } from '../../store/model';
import { DeleteChild, AddAnonymChild, ModChildName } from '../../store/actions';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit {
  children$: Observable<Child[]>;

  constructor(private store: Store<State>) {
    this.children$ = store.pipe(select(selectChildren));
  }

  ngOnInit() {
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
