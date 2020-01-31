import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';

import { Feature } from './../models/Feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private url = environment.apiUrl + 'features';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Feature[]>(this.url);
  }
}
