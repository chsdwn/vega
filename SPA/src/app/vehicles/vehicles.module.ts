import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VehiclesRoutingModule } from './vehicles-routing.module';

import { VehiclesComponent } from './vehicles.component';
import { VehicleHomeComponent } from './vehicle-home/vehicle-home.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleNewComponent } from './vehicle-new/vehicle-new.component';
import { DialogBoxComponent } from './../shared/dialog-box/dialog-box.component';

import { PlaceholderDirective } from './../shared/placeholder.directive';

@NgModule({
  declarations: [
    VehiclesComponent,
    VehicleHomeComponent,
    VehicleListComponent,
    VehicleNewComponent,
    DialogBoxComponent,
    PlaceholderDirective
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
