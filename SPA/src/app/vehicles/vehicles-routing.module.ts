import { Routes, RouterModule } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { VehicleNewComponent } from './vehicle-new/vehicle-new.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    children: [
      { path: 'new', component: VehicleNewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule {}
