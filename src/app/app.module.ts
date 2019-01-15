import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  MatFormFieldModule, MatListModule, MatInputModule, MatCardModule,
  MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule,
  MatTableModule
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/reducers';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ChildListComponent } from './child-list/child-list.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { TimeListComponent } from './time-list/time-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildListComponent,
    DeviceListComponent,
    TimeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    [StoreModule.forRoot({ state: reducer })],
    StoreDevtoolsModule.instrument(),
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
