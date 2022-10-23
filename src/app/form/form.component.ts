import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FormGroup, FormBuilder } from '@angular/forms';
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
    private calcsService: CalculationsService,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.inputForm = this.fb.group({
      airspeed: null,
      altitude: null,
      battVoltage: null,
      location: '',
      motorVoltage: null,
      propDiameter: null,
      units: 'imperial',
    });
  }

  submitValues(): void {
    this.calcsService.calculate(this.inputForm.value);
  }

  sendCityZip() {
    this.wxService.storeCityZip(this.inputForm.value.location);
  }

}
