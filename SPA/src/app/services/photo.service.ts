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

  upload(vehicleId: number, photo: File) {
    const formData = new FormData();
    formData.append('file', photo);
    
    return this.http.post(`${environment.apiUrl}vehicles/${vehicleId}/photos`, formData);
  }
}
