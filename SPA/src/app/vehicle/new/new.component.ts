import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { VehicleService } from './../../services/vehicle.service';

import { Make } from 'src/app/models/Make';
import { Model } from 'src/app/models/Model';
import { Feature } from './../../models/Feature';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  newVehicleForm: FormGroup;
  vehicle: {
    make: number,
    model: number
  } = {
    make: -1,
    model: -1
  };
  makes: Make[];
  models: Model[];
  features: Feature[];
  isFetching = false;

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(data => this.makes = data);

    this.isFetching = true;
    this.vehicleService.getFeatures().subscribe(data => {
      this.features = data;
      this.isFetching = false;
      if (!this.isFetching) {
        this.createForm();
      }
    });
  }

  createForm() {
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

  onMakeChange(e) {
    const id = +e.target.value;
    this.vehicle.make = id;

    const selectedMake = this.makes.find(m => m.id === id);
    this.models = selectedMake.models;

    console.log('vehicle', this.vehicle);
  }

  onModelChange(e) {
    const id = +e.target.value;
    this.vehicle.model = id;

    console.log('vehicle', this.vehicle);
  }

  onSubmit() {
    console.log(this.newVehicleForm.value);
  }
}
