import { Component, OnInit } from '@angular/core';
import { DEVICES } from '../../mocks/devices';
import { CHILDREN } from '../../mocks/children';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  children = CHILDREN;
  devices = DEVICES;

  constructor() { }

  ngOnInit() {
  }

  OnChildChange(i, value) {
    console.log('onChildChange', i, value);
  }

  onMacChange(i, value) {
    console.log('onMacChange', i, value);
  }

  onNameChange(i, value) {
    console.log('onNameChange', i, value);
  }

}
