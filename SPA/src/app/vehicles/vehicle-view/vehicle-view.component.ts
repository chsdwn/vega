import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { VehicleService } from './../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.scss']
})
export class VehicleViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.vehicleService.setVehicleId(+params.id);
      }
    });
  }

}
