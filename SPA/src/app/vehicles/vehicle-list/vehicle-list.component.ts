import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { VehicleService } from './../../services/vehicle.service';
import { Make } from './../../models/Make';
import { VehicleFilterByMake } from './../../models/VehicleFilterByMake';
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

  isFilteredByMake = false;
  filterByMakeId = -1;

  vehiclesCount: number;
  pageNumber: number;
  pageSize: number;
  pagesCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.pageSize = 3;
    this.pageNumber = 1;

    this.initVehicles();
  }

  initVehicles() {
    forkJoin(
      this.vehicleService.getVehiclePage(this.pageNumber, this.pageSize),
      this.vehicleService.getMakes(),
      this.vehicleService.getVehiclesCount()
    ).subscribe(([vehicles, makes, count]) => {
      this.vehicles = vehicles;
      this.filteredVehicles = vehicles;
      this.makes = makes;
      this.vehiclesCount = count;
      this.calculatePages();
    });
  }

  onVehicleView(id: number) {
    this.router.navigate(['/vehicles/', id]);
  }

  onMakeFilterChange(id: number) {
    if (id === -1) {
      this.filteredVehicles = this.vehicles;
      this.isFilteredByMake = false;
      this.filterByMakeId = -1;
      this.initVehicles();
      this.calculatePages();
      return;
    }

    const vehicleFilterByMake = new VehicleFilterByMake(id, this.pageSize, this.pageNumber);
    forkJoin(
      this.vehicleService.filterVehiclesByMake(vehicleFilterByMake),
      this.vehicleService.getFilterVehiclesByMakeCount(id),
    ).subscribe(([vehicles, count]) => {
      this.filteredVehicles = vehicles as VehicleList[];
      this.vehiclesCount = count as number;
      this.calculatePages();
      this.isFilteredByMake = true;
      this.filterByMakeId = id;
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

  onNextPage() {
    if (this.hasNextPage) {
      this.pageNumber++;
      let $vehicles: Observable<VehicleList[]>;

      if (this.filterByMakeId !== -1) {
        $vehicles = this.vehicleService.filterVehiclesByMake(new VehicleFilterByMake(
          this.filterByMakeId,
          this.pageSize,
          this.pageNumber
        ));
      } else {
        $vehicles = this.vehicleService.getVehiclePage(this.pageNumber, this.pageSize)
      }

      $vehicles.subscribe(data => {
        this.filteredVehicles = data;
        this.calculatePages();
      });
    }
  }

  onPreviousPage() {
    if (this.hasPreviousPage) {
      this.pageNumber--;

      let $vehicles: Observable<VehicleList[]>;

      if (this.filterByMakeId !== -1) {
        $vehicles = this.vehicleService.filterVehiclesByMake(new VehicleFilterByMake(
          this.filterByMakeId,
          this.pageSize,
          this.pageNumber
        ));
      } else {
        $vehicles = this.vehicleService.getVehiclePage(this.pageNumber, this.pageSize);
      }

      $vehicles.subscribe(data => {
        this.filteredVehicles = data;
        this.calculatePages();
      })
    }
  }

  private calculatePages() {
    this.pagesCount = Math.ceil(this.vehiclesCount / this.pageSize);
    this.hasNextPage = this.pagesCount > this.pageNumber;
    this.hasPreviousPage = this.pagesCount > 1 && this.pageNumber !== 1;
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
