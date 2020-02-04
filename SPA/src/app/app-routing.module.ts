import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleNewComponent } from './vehicles/vehicle-new/vehicle-new.component';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/vehicle/new'
  },
  {
    path: 'vehicle/new', component: VehicleNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
