import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { InputValues, WeatherData } from '../constants/interfaces';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CalculationsService } from '../services/calculations.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  myData: any = [];
  weather: any;
  inputForm!: FormGroup;

  @Input() blur = false;


  constructor(
    private wxService: WeatherService,
    private fb: FormBuilder,
    private calcs: CalculationsService,
    ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.inputForm = this.fb.group({
      units: 'imperial',
      propDiameter: null,
      battVoltage: null,
      motorVoltage: null,
      airspeed: null,
      altitude: null,
      location: '',
    });
  }

  submitValues(): void {
    console.log(this.inputForm.value);
    this.calcs.calculateMach1(this.inputForm);
  }

  sendCityZip() {
    this.wxService.storeCityZip(this.inputForm.value.location);
  }

}
