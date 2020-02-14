import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VehicleViewComponent } from './vehicle-view.component';
import { VehiclePhotoComponent } from './vehicle-photo/vehicle-photo.component';
import { VehicleBasicComponent } from './vehicle-basic/vehicle-basic.component';
import { DialogBoxComponent } from './../../shared/dialog-box/dialog-box.component';
import { PlaceholderDirective } from './../../shared/placeholder.directive';
import { VehicleViewRoutingModule } from './vehicle-view.routing.module';

@NgModule({
  declarations: [
    VehicleViewComponent,
    VehicleBasicComponent,
    VehiclePhotoComponent,
    DialogBoxComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    VehicleViewRoutingModule
  ],
  entryComponents: [
    DialogBoxComponent
  ]
})
export class VehicleViewModule {}
