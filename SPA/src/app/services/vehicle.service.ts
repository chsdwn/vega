import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';

import { Make } from '../models/Make';
import { Feature } from '../models/Feature';
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
    return this.http.get<Feature[]>(environment.apiUrl + 'features');
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
