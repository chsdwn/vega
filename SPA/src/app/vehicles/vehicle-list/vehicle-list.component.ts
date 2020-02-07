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
  sortedVehicles: VehicleList[];
  makes: Make[];
  isSorted: boolean[] = [null, null, null];

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

  onSortByMake() {
    this.sortByMake();
  }

  onSortByModel() {
    this.sortByModel();
  }

  onSortByContactName() {
    this.sortByContactName();
  }

  private sortByMake() {
    if (!this.isSorted[0]) {
      this.filteredVehicles.sort((v1, v2) => this.compareNames(v1.make.name, v2.make.name));
      this.isSorted[0] = true;
    } else {
      this.filteredVehicles.reverse();
      this.isSorted[0] = false;
    }

    this.isSorted[1] = null;
    this.isSorted[2] = null;
  }

  private sortByModel() {
    if (!this.isSorted[1]) {
      this.filteredVehicles.sort((v1, v2) => this.compareNames(v1.model.name, v2.model.name));
      this.isSorted[1] = true;
    } else {
      this.filteredVehicles.reverse();
      this.isSorted[1] = false;
    }

    this.isSorted[0] = null;
    this.isSorted[2] = null;
  }

  private sortByContactName() {
    if (!this.isSorted[2]) {
      this.filteredVehicles.sort((v1, v2) => this.compareNames(v1.contactName, v2.contactName));
      this.isSorted[2] = true;
    } else {
      this.filteredVehicles.reverse();
      this.isSorted[2] = false;
    }

    this.isSorted[0] = null;
    this.isSorted[1] = null;
  }

  private compareNames(name1: string, name2: string) {
    name1 = name1.toLowerCase();
    name2 = name2.toLowerCase();
    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }

    return 0;
  }
}
