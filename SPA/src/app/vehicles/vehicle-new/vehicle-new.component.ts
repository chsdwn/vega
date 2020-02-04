import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';

import { KeyValuePair } from './../../models/KeyValuePair';
import { Make } from '../../models/Make';
import { Model } from '../../models/Model';
import { VehicleDetail } from './../../models/VehicleDetail';

@Component({
  selector: 'app-vehicle-new',
  templateUrl: './vehicle-new.component.html',
  styleUrls: ['./vehicle-new.component.scss']
})
export class VehicleNewComponent implements OnInit {
  newVehicleForm: FormGroup;
  makes: Make[];
  models: Model[];
  features: KeyValuePair[];
  isFetching = false;
  id: number;
  editMode = false;
  vehicle: VehicleDetail;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.vehicleService.getMakes().subscribe(data => {
      this.makes = data;
      this.isFetching = false;
    });

    this.isFetching = true;
    this.vehicleService.getFeatures().subscribe(data => {
      this.features = data;
      this.isFetching = false;
    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initVehicle();
    });
  }

  createForm() {
    if (this.editMode) {
      // Features area needs to be filled.
      // const featuresFromAPI = this.vehicle.features;
      this.onMakeChange(this.vehicle.make.id);

      this.newVehicleForm = new FormGroup({
        vehicleData: new FormGroup({
          makes: new FormControl(this.vehicle.make.id),
          models: new FormControl(this.vehicle.model.id),
          isCarRegistered: new FormControl(this.vehicle.isRegistered),
          contactName: new FormControl(this.vehicle.contact.name),
          contactPhone: new FormControl(this.vehicle.contact.phone),
          contactMail: new FormControl(this.vehicle.contact.email),
          featureLabels: new FormArray(this.features.map(f => new FormControl(false)))
        })
      });
    } else {
      this.newVehicleForm = new FormGroup({
        vehicleData: new FormGroup({
          makes: new FormControl(),
          models: new FormControl(),
          isCarRegistered: new FormControl(),
          contactName: new FormControl(),
          contactPhone: new FormControl(),
          contactMail: new FormControl(),
          featureLabels: new FormArray(this.features.map(f => new FormControl(false)))
        })
      });
    }
  }

  initVehicle() {
    this.vehicleService.getVehicle(this.id).subscribe(data => {
      this.vehicle = data;
      if (!this.isFetching) {
        this.createForm();
      }
    });
  }

  onMakeChange(id: number) {
    if (id) {
      this.models = this.makes.find(m => m.id === id).models;
    }
  }

  onSubmit() {
    console.log(this.newVehicleForm.value);
  }
}
