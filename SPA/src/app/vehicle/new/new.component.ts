import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment.prod';
import { MakesService } from './../../services/makes.service';

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

  constructor(private http: HttpClient, private makesService: MakesService) { }

  ngOnInit() {
    this.makesService.get().subscribe(data => this.makes = data);
    // this.http.get<Make[]>('http://localhost:5000/api/features').pipe(
    //   map(data => this.features = data),
    //   map(data => this.featuresControls.map(control => new FormControl(false)))
    // );

    this.newVehicleForm = new FormGroup({
      vehicleData: new FormGroup({
        makes: new FormControl(),
        models: new FormControl(),
        isCarRegistered: new FormControl(),
        contactName: new FormControl(),
        contactPhone: new FormControl(),
        contactMail: new FormControl(),
        featureLabels: new FormArray([
          new FormControl(),
          new FormControl(),
          new FormControl()
        ])
      }),
    });
  }

  onSubmit() {
    console.log(this.newVehicleForm.value);
  }

  onModelSelect(id: number) {
    this.models = this.makes.find(make => make.id === +id).models;
  }

  onFeatureSelected(e) {
    console.log(e);
  }
}
