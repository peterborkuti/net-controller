import { Component, OnInit } from '@angular/core';
import { CHILDREN } from '../../mocks/children';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit {

  children = [{name: 'x'}, {name: 'y'}];

  empty = '';

  constructor() { }

  ngOnInit() {
  }

  onChange(name: string) {
    console.log(name);
  }

  onAddNewItem(name: string) {
    this.children.push({name: name});
  }

}
