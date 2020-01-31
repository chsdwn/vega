import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment.prod';
import { MakesService } from './../../services/makes.service';
import { FeatureService } from './../../services/feature.service';

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
  makes: Make[];
  models: Model[];
  features: Feature[] = [
    {id: 1, name: 'ABS'},
    {id: 2, name: 'GPS'},
    {id: 3, name: 'Sunroof'}
  ];
  featuresTest: Feature[];
  isFetching = false;
  featureLabelsArray = new FormArray([]);

  constructor(
    private http: HttpClient,
    private makesService: MakesService,
    private featureService: FeatureService
  ) { }

  ngOnInit() {
    this.makesService.get().subscribe(data => this.makes = data);

    this.isFetching = true;
    this.featureService.get().subscribe(data => {
      this.featuresTest = data;
      this.isFetching = false;
      if (!this.isFetching) {
        this.createForm();
      }
    });
  }

  onSubmit() {
    console.log(this.newVehicleForm.value);
  }

  onModelSelect(id: number) {
    this.models = this.makes.find(make => make.id === +id).models;
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
        featureLabels: new FormArray(this.featuresTest.map(f => new FormControl(false)))
      })
    });
  }
}
