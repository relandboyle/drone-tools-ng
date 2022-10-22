import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { InputValues, WeatherData } from '../types/interfaces';
import { InputStore } from '../constants/input-values';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  myData: any = [];
  weather: any;
  inputs: InputValues = InputStore;
  inputForm!: FormGroup;

  @Input() blur = false;


  constructor(
    private wxService: WeatherService,
    private fb: FormBuilder,
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

  onSubmit(): void {
    console.log(this.inputForm.value);
  }

  sendCityZip() {
    this.wxService.storeCityZip(this.inputForm.value.location);
  }

}
