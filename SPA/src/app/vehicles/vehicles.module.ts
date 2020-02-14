import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VehiclesRoutingModule } from './vehicles-routing.module';

import { VehiclesComponent } from './vehicles.component';
import { VehicleHomeComponent } from './vehicle-home/vehicle-home.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleBasicComponent } from './vehicle-basic/vehicle-basic.component';
import { DialogBoxComponent } from './../shared/dialog-box/dialog-box.component';
import { PaginationComponent } from './../shared/pagination/pagination.component';

import { PlaceholderDirective } from './../shared/placeholder.directive';

@NgModule({
  declarations: [
    VehiclesComponent,
    VehicleBasicComponent,
    VehicleHomeComponent,
    VehicleListComponent,
    DialogBoxComponent,
    PlaceholderDirective,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    VehiclesRoutingModule
  ],
  entryComponents: [
    DialogBoxComponent
  ]
})
export class VehiclesModule {}
