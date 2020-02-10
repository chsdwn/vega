import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';

import { KeyValuePair } from './../models/KeyValuePair';
import { Make } from '../models/Make';
import { Sorting } from './../models/Sorting';
import { VehicleCreate } from './../models/VehicleCreate';
import { VehicleDetail } from './../models/VehicleDetail';
import { VehicleFilterByMake } from '../models/VehicleFilterByMake';
import { VehicleList } from './../models/VehicleList';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get<Make[]>(environment.apiUrl + 'makes');
  }

  getFeatures() {
    return this.http.get<KeyValuePair[]>(environment.apiUrl + 'features');
  }

  addVehicle(vehicle: VehicleCreate) {
    return this.http.post(environment.apiUrl + 'vehicles', vehicle);
  }

  updateVehicle(vehicle: VehicleCreate, id: number) {
    return this.http.put(environment.apiUrl + 'vehicles/' + id, vehicle);
  }

  getVehicle(id: number) {
    return this.http.get<VehicleDetail>(environment.apiUrl + 'vehicles/' + id);
  }

  getVehicles() {
    return this.http.get<VehicleList[]>(environment.apiUrl + 'vehicles');
  }

  getVehiclesCount() {
    return this.http.get<number>(environment.apiUrl + 'vehicles/count');
  }

  getFilterVehiclesByMakeCount(makeId: number) {
    return this.http.post(environment.apiUrl + 'vehicles/filterByMake/count', makeId);
  }

  getVehiclePage(pageNumber: number, pageSize: number) {
    return this.http
      .post(
        environment.apiUrl 
        + 'vehicles/page/' 
        + pageNumber 
        + '/size/' 
        + pageSize
        , null
      ) as Observable<VehicleList[]>;
  }

  filterVehiclesByMake(vehicleFilterByMake: VehicleFilterByMake) {
    return this.http.post(environment.apiUrl + 'vehicles/filterByMake', vehicleFilterByMake) as Observable<VehicleList[]>;
  }

  removeVehicle(id: number) {
    return this.http.delete(environment.apiUrl + 'vehicles/' + id);
  }

  sortVehicles(sorting: Sorting) {
    return this.http.post(environment.apiUrl + 'vehicles/sort', sorting) as Observable<VehicleList[]>;
  }

  sortFilteredByMake(sorting: Sorting, makeId: number) {
    return this.http.post(environment.apiUrl + 'vehicles/sort/' + makeId, sorting) as Observable<VehicleList[]>;
  }
}
