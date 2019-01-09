import { Component, OnInit } from '@angular/core';
import { CHILDREN } from '../../mocks/children';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit {

  children = CHILDREN;

  constructor() { }

  ngOnInit() {
  }

}
