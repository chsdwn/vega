import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VehiclesRoutingModule } from './vehicles-routing.module';

import { VehiclesComponent } from './vehicles.component';
import { VehicleHomeComponent } from './vehicle-home/vehicle-home.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { PaginationComponent } from './../shared/pagination/pagination.component';

@NgModule({
  declarations: [
    VehiclesComponent,
    VehicleHomeComponent,
    VehicleListComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    VehiclesRoutingModule
  ]
})
export class VehiclesModule {}
