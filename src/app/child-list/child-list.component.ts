import { Component, OnInit } from '@angular/core';
import { CHILDREN } from '../../mocks/children';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit {

  children = CHILDREN;

  empty = '';

  constructor() { }

  ngOnInit() {
  }

  onChange(name: string) {
    console.log(name);
  }

  onAddNewItem(name: string) {
    // this.children.push(new Child());
  }

}
