import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './vehicle/new/new.component';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/vehicle/new'
  },
  {
    path: 'vehicle/new', component: NewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
