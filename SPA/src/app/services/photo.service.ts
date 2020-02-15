import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  uploadProgress = new EventEmitter<number>();

  constructor(private http: HttpClient) { }
  
  getPhotos(vehicleId: number) {
    return this.http.get<{id:number, fileName: string}[]>(`${environment.apiUrl}vehicles/${vehicleId}/photos`);
  }

  upload(vehicleId: number, photo: File) {
    this.uploadProgress.next(0);

    const formData = new FormData();
    formData.append('file', photo);
    
    return this.http.post(`${environment.apiUrl}vehicles/${vehicleId}/photos`,
      formData,
      { reportProgress: true, observe: 'events' }
    ).pipe(
      map(event => {
        switch(event.type) {
          case HttpEventType.UploadProgress:
            const percentage = Math.round(100 * event.loaded / event.total);
            this.uploadProgress.next(percentage);
          case HttpEventType.Response:
            return event.body;
        }
      })
    );
  }
}
