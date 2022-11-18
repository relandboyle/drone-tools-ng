import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CalculationsService } from '../services/calculations.service';
import { WeatherService } from '../services/weather.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  inputForm!: FormGroup;
  location: string = '';
  formBlur: boolean = false;

  @Output() blur = new EventEmitter<boolean>(false);
  public units = new Subject<string>();


  constructor(
    private wxService: WeatherService,
    private calcsService: CalculationsService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.initializeForm();
    this.syncValues();
  }


  initializeForm(): void {
    this.inputForm = this.fb.group({
      airspeedKph: new FormControl(),
      airspeedKnots: new FormControl(),
      altitude: new FormControl(),
      battVoltage: new FormControl(),
      location: new FormControl(''),
      motorVoltage: new FormControl(),
      propDiameterIn: new FormControl(),
      propDiameterMm: new FormControl(),
      units: new FormControl('imperial'),
    });
  }


  syncValues(): void {
    const form = this.inputForm;
    const noEmit = { emitEvent: false };
    const diameterImperial = form.controls['propDiameterIn'];
    const diameterMetric = form.controls['propDiameterMm'];
    const airspeedKnots = form.controls['airspeedKnots'];
    const airspeedKph = form.controls['airspeedKph'];
    const units = form.controls['units'];
    this.units.next(form.value.units);


    diameterImperial.valueChanges.subscribe(input => {
      if (form.value.units === 'imperial' && diameterMetric.pristine) {
        form.patchValue({
          propDiameterMm: parseFloat((input * 25.4).toFixed(2)) || null
        }, noEmit);
      }
    });


    diameterMetric.valueChanges.subscribe(input => {
      if (form.value.units === 'metric' && diameterImperial.pristine) {
        form.patchValue({
          propDiameterIn: parseFloat((input / 25.4).toFixed(1)) || null
        }, noEmit);
      }
    });


    airspeedKnots.valueChanges.subscribe(input => {
      if (form.value.units === 'imperial' && airspeedKph.pristine) {
        form.patchValue({
          airspeedKph: parseFloat((input * 1.852).toFixed(1)) || null
        }, noEmit);
      }
    });


    airspeedKph.valueChanges.subscribe(input => {
      if (form.value.units === 'metric' && airspeedKnots.pristine) {
        form.patchValue({
          airspeedKnots:  parseFloat((input * 0.539957).toFixed(1)) || null
        }, noEmit);
      }
    });


    units.valueChanges.subscribe(change => {
      this.wxService.getUnits(change);

      if (change === 'imperial') {
        diameterMetric.markAsPristine();
        airspeedKph.markAsPristine();
      }
      else if (change === 'metric') {
        diameterImperial.markAsPristine();
        airspeedKnots.markAsPristine();
      }
    });
  }


  submitValues(formBlur: boolean): void {
    console.log(formBlur, this.formBlur);
    let dialogMessage = '';

    if (!this.inputForm.controls['propDiameterIn'].value) {
      dialogMessage = 'Please enter propeller diameter!';
    }
    else if (!this.inputForm.controls['battVoltage'].value) {
      dialogMessage = 'Please enter battery voltage!';
    }
    else if (!this.inputForm.controls['motorVoltage'].value) {
      dialogMessage = 'Please enter motor power rating!';
    }

    if (dialogMessage === '') {
      this.calcsService.calculatePropTipSpeed(this.inputForm);
    }
    else if (dialogMessage !== '') {
      this.openDialog(dialogMessage);
      this.blur.emit(this.formBlur);
    }
    console.log(formBlur, this.formBlur);

  }


  sendLocation(): void {
    let dialogMessage = '';

    if (this.inputForm.controls['location'].value === '') {
      dialogMessage = 'Please enter a city or postal code!'
      this.openDialog(dialogMessage);
    }
    else {
      this.wxService.getWeather(this.inputForm.value.location);
      this.calcsService.calculateLocalMach1(this.inputForm.value.altitude);
    }
  }


  openDialog(dialogMessage: string) {

    let dialogConfig = new MatDialogConfig();

    dialogConfig = {
      ...dialogConfig,
      autoFocus: true,
      panelClass: 'dialog-panel',
      data: {
        id: 'input-error',
        title: dialogMessage,
        message: dialogMessage
      },
      delayFocusTrap: true,
      disableClose: true,
      id: 'input-error',
      width: '40%',
    }

    this.dialog.open(DialogComponent, dialogConfig);
  }

  test() {
    console.log('TEST BUTTON')
  }

}
