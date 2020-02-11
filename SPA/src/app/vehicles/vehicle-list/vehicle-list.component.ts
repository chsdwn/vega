import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject, Observable } from 'rxjs';

import { Make } from './../../models/Make';
import { QueryResult } from './../../models/QueryResult';
import { VehicleService } from './../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  queryResult: QueryResult[];
  makes: Make[];

  page: Observable<number>;

  query: any = {
    pageSize: 3
  };

  sortableColumns = [
    { title: 'Make', key: 'make' },
    { title: 'Model', key: 'model' },
    { title: 'Name', key: 'contactName' }
  ];

  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
    this.populateVehicles();

    //this.page.subscribe(page => console.log(page));
  }

  onVehicleView(id: number) {
    this.router.navigate(['/vehicles/', id]);
  }

  onFilterChange() {
    this.query.page = 1;
    this.populateVehicles();
  }

  onPageChange(e) {
    this.query.page = e;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: 3
    };
    this.populateVehicles();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }

    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query).subscribe(result => this.queryResult = result);
  }
}
