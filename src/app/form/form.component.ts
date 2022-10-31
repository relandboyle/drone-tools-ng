import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CalculationsService } from '../services/calculations.service';
import { combineLatest, combineLatestAll, forkJoin, merge, Observable, withLatestFrom, tap, zip, from, of, mergeWith } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  inputForm!: FormGroup;
  location: string = '';
  @Input() blur = false;


  constructor(
    private wxService: WeatherService,
    private calcsService: CalculationsService,
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
    console.log(Object.entries(this.inputForm.value).forEach((value: any) => {
      console.log(value)
    }))
    Object.entries(this.inputForm.controls).forEach((value: any) => {
      console.table(value[1].pristine, value[0])
    })
  }


  sendLocation(): void {
    this.wxService.storeCityZip(this.inputForm.value.location);
  }
}
