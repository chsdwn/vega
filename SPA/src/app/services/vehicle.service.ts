import { QueryResult } from './../models/QueryResult';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  public id = new EventEmitter<number>();

  constructor(private http: HttpClient) { }

  getVehicleId() {
    return this.id;
  }

  setVehicleId(id: number) {
    this.id.next(id);
  }

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

  getVehicles(filter) {
    return this.http.get<QueryResult[]>(environment.apiUrl + 'vehicles?' + this.toQueryString(filter));
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

  removeVehicle(id: number) {
    return this.http.delete(environment.apiUrl + 'vehicles/' + id);
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];

      if (value !== null && value !== undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }

    return parts.join('&');
  }
}
