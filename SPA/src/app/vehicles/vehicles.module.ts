import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { VehicleNewComponent } from './vehicle-new/vehicle-new.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';

@NgModule({
  declarations: [
    VehiclesComponent,
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
