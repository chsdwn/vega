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

  constructor(
    private photoService: PhotoService,
    private vehicleService: VehicleService
  ) {
    this.vehicleService.getVehicleId().subscribe(vehicleId => this.vehicleId = vehicleId);
  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId).subscribe(photos => {
      for (const photo of photos) {
        const photoWithUrl = {
          id: photo.id,
          fileName: photo.fileName,
          url: `http://localhost:5000/uploads/${photo.fileName}`,
          thumbnailUrl: `http://localhost:5000/uploads/thumb-${photo.fileName}`
        }
        this.photos.push(photoWithUrl);
      }
    });
  }

}
