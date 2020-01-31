import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';

import { Make } from '../models/Make';
import { Model } from './../models/Model';

@Injectable({
  providedIn: 'root'
})
export class MakesService {
  private url = environment.apiUrl + 'makes';
  private makes = new Observable<Make[]>();
  private makesSubj = new Subject<Make[]>();
  private makesList: Make[];

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Make[]>(this.url);
  }

  getModels(id: number) {
    let models;
    this.get().subscribe(data => {
      models = data.find(m => m.id === id).models;
    });
    return models;
  }
}
