import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildListComponent } from './child-list/child-list.component';

const routes: Routes = [
  { path: 'childlist', component: ChildListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
