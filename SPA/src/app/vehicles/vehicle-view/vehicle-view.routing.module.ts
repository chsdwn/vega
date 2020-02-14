import { Routes, RouterModule } from '@angular/router';

import { VehicleViewComponent } from './vehicle-view.component';
import { VehiclePhotoComponent } from './vehicle-photo/vehicle-photo.component';
import { VehicleBasicComponent } from './vehicle-basic/vehicle-basic.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', component: VehicleViewComponent,
    children: [
      { path: 'basic', component: VehicleBasicComponent },
      { path: 'photo', component: VehiclePhotoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleViewRoutingModule {}
