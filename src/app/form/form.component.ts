import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CalculationsService } from '../services/calculations.service';
import { tap } from 'rxjs';

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
      airspeed: new FormControl(),
      airspeedKph: new FormControl(),
      airspeedKnots: new FormControl(),
      altitude: new FormControl(),
      battVoltage: new FormControl(),
      location: '',
      motorVoltage: new FormControl(),
      propDiameter: new FormControl(),
      propDiameterIn: new FormControl(),
      propDiameterMm: new FormControl(),
      units: 'imperial',
    });
  }


  syncValues(): void {
    const form = this.inputForm;

    form.valueChanges.subscribe(input => {
      console.log('INPUT', input)
      if (form.value.units === 'imperial') {
        form.patchValue({
          propDiameter: form.value.propDiameterIn || null,
          propDiameterMm: parseFloat((form.value.propDiameterIn * 25.4).toFixed(1)) || null,
        },
        {
          emitEvent: false
        });
      }
      else if (form.value.units === 'metric') {
        form.patchValue({
          propDiameter: form.value.propDiameterMm || null,
          propDiameterIn: parseFloat((form.value.propDiameterMm / 25.4).toFixed(1)) || null,
        },
        {
          emitEvent: false
        });
      }
    });
  }


  submitValues(): void {
    this.calcsService.calculate(this.inputForm.value);
  }


  sendLocation(): void {
    this.wxService.storeCityZip(this.inputForm.value.location);
  }

}
