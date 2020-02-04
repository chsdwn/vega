import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VehiclesRoutingModule } from './vehicles-routing.module';

import { VehiclesComponent } from './vehicles.component';
import { VehicleHomeComponent } from './vehicle-home/vehicle-home.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleNewComponent } from './vehicle-new/vehicle-new.component';

@NgModule({
  declarations: [
    VehiclesComponent,
    VehicleHomeComponent,
    VehicleListComponent,
    VehicleNewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    VehiclesRoutingModule
  ]
})
export class VehiclesModule {}
