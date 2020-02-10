import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

import { VehicleService } from './../../services/vehicle.service';
import { Make } from './../../models/Make';
import { Sorting } from 'src/app/models/Sorting';
import { VehicleFilterByMake } from './../../models/VehicleFilterByMake';
import { VehicleList } from './../../models/VehicleList';

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

  isSortedByMakeAsc: boolean = null;
  isSortedByModelAsc: boolean = null;
  isSortedByNameAsc: boolean = null;

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
    let sorting: Sorting;
    this.pageNumber = 1;
    this.isSortedByModelAsc = null;
    this.isSortedByNameAsc = null;

    if (this.isSortedByMakeAsc === null || !this.isSortedByMakeAsc) {
      sorting = new Sorting('make', this.pageSize, this.pageNumber);
      this.isSortedByMakeAsc = true;
    } else if (this.isSortedByMakeAsc) {
      sorting = new Sorting('make_desc', this.pageSize, this.pageNumber);
      this.isSortedByMakeAsc = false;
    }

    this.vehicleService.sortVehicles(sorting).subscribe(data => {
      this.filteredVehicles = data;
    });
  }

  onSortByModel() {
    let sorting: Sorting;
    this.pageNumber = 1;
    this.isSortedByMakeAsc = null;
    this.isSortedByNameAsc = null;

    if (this.isSortedByModelAsc === null || !this.isSortedByModelAsc) {
      sorting = new Sorting('model', this.pageSize, this.pageNumber);
      this.isSortedByModelAsc = true;
    } else if (this.isSortedByModelAsc) {
      sorting = new Sorting('model_desc', this.pageSize, this.pageNumber);
      this.isSortedByModelAsc = false;
    }

    this.vehicleService.sortVehicles(sorting).subscribe(data => {
      this.filteredVehicles = data;
    });
  }

  onSortByContactName() {
    let sorting: Sorting;
    this.pageNumber = 1;
    this.isSortedByMakeAsc = null;
    this.isSortedByModelAsc = null;

    if (this.isSortedByNameAsc === null || !this.isSortedByNameAsc) {
      sorting = new Sorting('name', this.pageSize, this.pageNumber);
      this.isSortedByNameAsc = true;
    } else if (this.isSortedByNameAsc) {
      sorting = new Sorting('name_desc', this.pageSize, this.pageNumber);
      this.isSortedByNameAsc = false;
    }

    this.vehicleService.sortVehicles(sorting).subscribe(data => {
      this.filteredVehicles = data;
    });
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
