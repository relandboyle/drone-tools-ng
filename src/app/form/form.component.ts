import { Component, Input, OnInit } from '@angular/core';
import { CalculationsService } from '../services/calculations.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  dialogTitle: string = 'Testing Dialog Title';
  inputForm!: FormGroup;
  location: string = '';
  @Input() blur!: boolean;

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


  submitValues(): void {
    this.calcsService.calculatePropTipSpeed(this.inputForm);
    // this.openDialog();
  }


  sendLocation(): void {
    this.wxService.getWeather(this.inputForm.value.location);
    this.calcsService.calculateLocalMach1(this.inputForm.value.altitude);
  }


  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 'input-error',
      title: this.dialogTitle
    }

    this.dialog.open(DialogComponent, dialogConfig);
  }

}
