import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { VehicleService } from './../../services/vehicle.service';
import { Make } from './../../models/Make';
import { VehicleList } from './../../models/VehicleList';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles: VehicleList[];
  filteredVehicles: VehicleList[];
  makes: Make[];

  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    forkJoin(
      this.vehicleService.getVehicles(),
      this.vehicleService.getMakes()
    ).subscribe(([vehicles, makes]) => {
      this.vehicles = vehicles;
      this.filteredVehicles = vehicles;
      this.makes = makes;
    });
  }

  onVehicleView(id: number) {
    this.router.navigate(['/vehicles/', id]);
  }

  onMakeFilterChange(id: number) {
    if (id === -1) {
      this.filteredVehicles = this.vehicles;
      return;
    }

    this.filteredVehicles = [];
    this.vehicles.find(v => {
      if (v.make.id === id) {
        this.filteredVehicles.push(v);
      }
    });
  }
}
