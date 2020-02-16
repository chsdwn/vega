import { Subscription } from 'rxjs';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { VehicleService } from './../../../services/vehicle.service';
import { PhotoService } from './../../../services/photo.service';

@Component({
  selector: 'app-vehicle-photo',
  templateUrl: './vehicle-photo.component.html',
  styleUrls: ['./vehicle-photo.component.scss']
})
export class VehiclePhotoComponent implements OnInit {
  vehicleId: number;
  photos: {
    id:number,
    fileName: string,
    url: string,
    thumbnailUrl: string
  }[] = [];
  photoUploadPercentage: number = 0;

  constructor(
    private photoService: PhotoService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleId = this.vehicleService.id;

    if (this.vehicleId) {
      this.photoService.getPhotos(this.vehicleId).subscribe(photos => {
        for (const photo of photos) {
          this.photos.push(this.createPhotoWithUrl(photo));
        }
      });
    }
  }

  onPhotoSelect(e) {
    if (this.vehicleId) {
      const photo = e.target.files[0];
      
      this.photoService.upload(this.vehicleId, photo)
        .subscribe(photo => {
          if (photo) {
            this.photos.push(this.createPhotoWithUrl(photo));
            this.photoUploadPercentage = 0;
          }
        });
      
      this.photoService.uploadProgress.subscribe(percentage => this.photoUploadPercentage = percentage);
    }
  }

  private createPhotoWithUrl(photo) {
    return {
      id: photo.id,
      fileName: photo.fileName,
      url: `http://localhost:5000/uploads/${photo.fileName}`,
      thumbnailUrl: `http://localhost:5000/uploads/thumb-${photo.fileName}`
    };
  }
}
