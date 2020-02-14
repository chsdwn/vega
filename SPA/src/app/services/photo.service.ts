import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }
  
  getPhotos(vehicleId: number) {
    return this.http.get<{id:number, fileName: string}[]>(`${environment.apiUrl}vehicles/${vehicleId}/photos`);
  }
}
