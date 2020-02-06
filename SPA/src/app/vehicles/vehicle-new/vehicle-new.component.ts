import { Component, OnInit, ViewChild, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VehicleService } from '../../services/vehicle.service';

import { DialogBoxComponent } from './../../shared/dialog-box/dialog-box.component';
import { PlaceholderDirective } from './../../shared/placeholder.directive';

import { Contact } from './../../models/Contact';
import { Feature } from './../../models/Feature';
import { KeyValuePair } from './../../models/KeyValuePair';
import { Make } from '../../models/Make';
import { VehicleCreate } from './../../models/VehicleCreate';
import { VehicleDetail } from './../../models/VehicleDetail';

@Component({
  selector: 'app-vehicle-new',
  templateUrl: './vehicle-new.component.html',
  styleUrls: ['./vehicle-new.component.scss']
})
export class VehicleNewComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: true }) dialogBoxHost: PlaceholderDirective;
  id: number;
  vehicle: VehicleDetail;
  newVehicleForm: FormGroup;
  makes: Make[];
  models: KeyValuePair[];
  features: Feature[];
  editMode = false;
  private dialogBoxComponentSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private componentFactoryResolver: ComponentFactoryResolver
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

  ngOnDestroy() {
    if (this.dialogBoxComponentSubscription) {
      this.dialogBoxComponentSubscription.unsubscribe();
    }
  }

  createForm() {
    if (this.editMode) {
      this.initFeatures();
      this.initModels(this.vehicle.make.id);

      this.newVehicleForm = new FormGroup({
        vehicleData: new FormGroup({
          makes: new FormControl(this.vehicle.make.id, Validators.required),
          models: new FormControl(this.vehicle.model.id, Validators.required),
          isCarRegistered: new FormControl(this.vehicle.isRegistered, Validators.required),
          contactName: new FormControl(this.vehicle.contact.name, Validators.required),
          contactPhone: new FormControl(this.vehicle.contact.phone, Validators.required),
          contactMail: new FormControl(this.vehicle.contact.email, [Validators.required, Validators.email]),
          featureLabels: new FormArray(this.features.map(f => new FormControl(f.selected)))
        })
      });

    } else {
      this.newVehicleForm = new FormGroup({
        vehicleData: new FormGroup({
          makes: new FormControl(null, Validators.required),
          models: new FormControl(null, Validators.required),
          isCarRegistered: new FormControl(false, Validators.required),
          contactName: new FormControl(null, Validators.required),
          contactPhone: new FormControl(null, Validators.required),
          contactMail: new FormControl(null, [Validators.required, Validators.email]),
          featureLabels: new FormArray(this.features.map(f => new FormControl(false)))
        })
      });
    }
  }

  onMakeChange(id: number) {
    this.initModels(id);

    (this.newVehicleForm.controls.vehicleData as FormGroup).patchValue({
      models: [this.models[0].id]
    });
  }

  onFeatureSelect(id: number) {
    this.features.find(f => {
      if (f.id === id) {
        f.selected = !f.selected;
      }
    });
    console.log(this.features);
  }

  onDelete() {
    this.createDeleteDialogBox();
  }

  onSubmit() {
    if (this.newVehicleForm.valid) {
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
    }
  }

  initFeatures() {
    if (this.features && this.vehicle) {
      this.vehicle.features.map(vf => {
        this.features.find(f => {
          if (f.name === vf.name) {
            f.selected = true;
          }
        });
      });
    }
  }

  initModels(id: number) {
    if (id) {
      this.models = this.makes.find(m => m.id === id).models;
    }
  }

  createDeleteDialogBox() {
    const dialogBoxComponentFactory
      = this.componentFactoryResolver.resolveComponentFactory(DialogBoxComponent);

    const hostViewContainerRef = this.dialogBoxHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(dialogBoxComponentFactory);
    componentRef.instance.question = 'Are you sure to delete this vehicle?';
    componentRef.instance.approveText = 'Yes';
    componentRef.instance.denyText = 'No';

    this.dialogBoxComponentSubscription = componentRef.instance.closeDialogBox.subscribe(() => {
      this.dialogBoxComponentSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });

    this.dialogBoxComponentSubscription = componentRef.instance.isApproved.subscribe((isApproved: boolean) => {
      if (isApproved) {
        this.vehicleService.removeVehicle(this.id).subscribe(res => {
          this.router.navigate(['../', 'list'], { relativeTo: this.route });
        });
      } else {
        this.dialogBoxComponentSubscription.unsubscribe();
        hostViewContainerRef.clear();
      }
    });
  }
}
