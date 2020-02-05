import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';

import { Contact } from './../../models/Contact';
import { Feature } from './../../models/Feature';
import { KeyValuePair } from './../../models/KeyValuePair';
import { Make } from '../../models/Make';
import { Model } from '../../models/Model';
import { VehicleCreate } from './../../models/VehicleCreate';
import { VehicleDetail } from './../../models/VehicleDetail';

@Component({
  selector: 'app-vehicle-new',
  templateUrl: './vehicle-new.component.html',
  styleUrls: ['./vehicle-new.component.scss']
})
export class VehicleNewComponent implements OnInit {
  id: number;
  vehicle: VehicleDetail;
  newVehicleForm: FormGroup;
  makes: Make[];
  models: Model[];
  features: Feature[];
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makesRes => {
      this.makes = makesRes;

      this.vehicleService.getFeatures().subscribe(featuresRes => {
        this.features = featuresRes as Feature[];

        this.route.params.subscribe((params: Params) => {
          this.id = +params.id;
          this.editMode = params.id != null;

          if (this.editMode) {
            this.vehicleService.getVehicle(this.id).subscribe(vehicleRes => {
              this.vehicle = vehicleRes;
              this.createForm();
            });
          } else {
            this.createForm();
          }
        });
      });
    });
  }

  createForm() {
    if (this.editMode) {
      this.initFeatures();

      this.newVehicleForm = new FormGroup({
        vehicleData: new FormGroup({
          makes: new FormControl(this.vehicle.make.id),
          models: new FormControl(this.vehicle.model.id),
          isCarRegistered: new FormControl(this.vehicle.isRegistered),
          contactName: new FormControl(this.vehicle.contact.name),
          contactPhone: new FormControl(this.vehicle.contact.phone),
          contactMail: new FormControl(this.vehicle.contact.email),
          featureLabels: new FormArray(this.features.map(f => new FormControl(f.selected)))
        })
      });

      this.onMakeChange(this.vehicle.make.id);

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

  onMakeChange(id: number) {
    if (id) {
      this.models = this.makes.find(m => m.id === id).models;
    }
  }

  onSubmit() {
    const modelId = +this.newVehicleForm.value.vehicleData.models;
    const isRegistered = this.newVehicleForm.value.vehicleData.isCarRegistered;
    const contactName = this.newVehicleForm.value.vehicleData.contactName;
    const contactEmail = this.newVehicleForm.value.vehicleData.contactMail;
    const contactPhone = this.newVehicleForm.value.vehicleData.contactPhone;

    const featureIds: number[] = [];
    this.features.map(f => f.selected === true ? featureIds.push(f.id) : null);

    const contact = new Contact(contactName, contactPhone, contactEmail);

    const createVehicle = new VehicleCreate(
      modelId,
      isRegistered,
      featureIds,
      contact
    );

    console.log(createVehicle);
  }

  initFeatures() {
    if (this.features) {
      this.vehicle.features.map(vf => {
        this.features.find(f => {
          if (f.name === vf.name) {
            f.selected = true;
          }
        });
      });
    }
  }
}
