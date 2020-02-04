import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';

import { Make } from '../models/Make';
import { Feature } from '../models/Feature';
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

  getVehicles() {
    return this.http.get<VehicleList[]>(environment.apiUrl + 'vehicles');
  }
}
