import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';

import { KeyValuePair } from './../models/KeyValuePair';
import { Make } from '../models/Make';
import { VehicleCreate } from './../models/VehicleCreate';
import { VehicleDetail } from './../models/VehicleDetail';
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

  removeVehicle(id: number) {
    return this.http.delete(environment.apiUrl + 'vehicles/' + id);
  }
}
