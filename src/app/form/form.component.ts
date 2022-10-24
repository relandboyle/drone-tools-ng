import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CalculationsService } from '../services/calculations.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

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
      airspeed: new FormControl(),
      altitude: new FormControl(),
      battVoltage: new FormControl(),
      location: '',
      motorVoltage: new FormControl(),
      propDiameterIn: new FormControl(),
      propDiameterMm: new FormControl(),
      units: 'imperial',
    });
  }


  submitValues(): void {
    this.calcsService.calculate(this.inputForm.value);
  }


  sendCityZip(): void {
    this.wxService.storeCityZip(this.inputForm.value.location);
  }


  test() {

  }


  test2() {
    this.inputForm.patchValue({
      propDiameterIn: 6,
      propDiameterMm: 150,
    });

    console.log(this.inputForm.value);
  }


  test3() {
    console.log(this.inputForm.value)
  }


  performConversions(units: string): void {

    // if Imperial is selected, propDiaIn is user input value and propDiaMm is calculated
    // if Metric is selected, propDiaMm is user input value and propDiaIn is calculated
    // update propDiaIn and propDiaMm in state

    let propDiaIn = 0;
    let propDiaMm = 0;
    // console.log('BEFORE', {propDiaIn, propDiaMm, units})

    if (units === 'imperial') {
      propDiaIn = this.inputForm.value.propDiameterIn;
      propDiaMm = parseFloat((this.inputForm.value.propDiameterIn * 25.4).toFixed(1));
      this.inputForm.patchValue({ units: 'imperial' });
    }
    if (units === 'metric') {
      propDiaIn = parseFloat((this.inputForm.value.propDiameterMm / 25.4).toFixed(1));
      propDiaMm = this.inputForm.value.propDiameterMm;
      this.inputForm.patchValue({ units: 'metric' });
    }
    this.inputForm.patchValue({
      propDiameterIn: propDiaIn,
      propDiameterMm: propDiaMm,
    });

    // console.log('AFTER', {propDiaIn, propDiaMm, units})
    // console.log(this.inputForm.value.propDiameterIn, this.inputForm.value.propDiameterMm);
  }


  ngOnDestroy(): void {
    console.log('ON DESTROY');
  }

}
