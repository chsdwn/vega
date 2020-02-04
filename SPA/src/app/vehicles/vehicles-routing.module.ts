import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiclesComponent } from './vehicles.component';
import { VehicleHomeComponent } from './vehicle-home/vehicle-home.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleNewComponent } from './vehicle-new/vehicle-new.component';

const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    children: [
      { path: '', component: VehicleHomeComponent},
      { path: 'list', component: VehicleListComponent },
      { path: 'new', component: VehicleNewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule {}
