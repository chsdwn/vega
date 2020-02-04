import { Component, OnInit } from '@angular/core';

import { VehicleService } from './../../services/vehicle.service';
import { VehicleList } from './../../models/VehicleList';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles: VehicleList[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe(data => {
      this.vehicles = data;
    });
  }

  onVehicleDelete(index: number, id: number) {
    this.vehicleService.removeVehicle(id).subscribe(res => {
      this.vehicles.splice(index, 1);
    });
  }
}
