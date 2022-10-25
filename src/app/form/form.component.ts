import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CalculationsService } from '../services/calculations.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  inputForm!: FormGroup;
  location: string = '';
  flag: boolean = true;
  @Input() blur = false;


  constructor(
    private wxService: WeatherService,
    private calcsService: CalculationsService,
    private fb: FormBuilder,
    ) { }


  ngOnInit(): void {
    this.initializeForm();
    this.syncValues()
  }


  initializeForm(): void {
    this.inputForm = this.fb.group({
      airspeed: new FormControl(),
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


  syncValues() {
    const form = this.inputForm;

    this.inputForm.get('propDiameter')?.valueChanges.subscribe(input => {
      if (this.flag === false) return;

      if (form.value.units === 'imperial') {
        form.patchValue({
          propDiameterIn: input,
          propDiameterMm: parseFloat((input * 25.4).toFixed(1)) || null
        });
      }
      else if (form.value.units === 'metric') {
        form.patchValue({
          propDiameterIn: parseFloat((input / 25.4).toFixed(1)) || null,
          propDiameterMm: input
        });
      }
    });
  }


  submitValues(): void {
    this.calcsService.calculate(this.inputForm.value);
  }


  sendCityZip(): void {
    this.wxService.storeCityZip(this.inputForm.value.location);
  }


  handleUnits(units: string): void {
    console.log(units === this.inputForm.value.units)

    this.flag = false;

    (units !== this.inputForm.value.units) &&
      (units === 'imperial')
        ? this.inputForm.patchValue({ propDiameter: this.inputForm.value.propDiameterIn })
        : this.inputForm.patchValue({ propDiameter: this.inputForm.value.propDiameterMm });

    this.flag = true;
  }

}
