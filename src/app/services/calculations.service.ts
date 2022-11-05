import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { DisplayValues, RevolveRates } from '../../constants/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  feetPerSecond: number = 0;
  metersPerSecond: number = 0;

  inputs: DisplayValues = {
    airspeedKph: 0,
    airspeedKnots: 0,
    altitude: 0,
    battVoltage: 0,
    location: '',
    motorVoltage: 0,
    propDiameterIn: 0,
    propDiameterMm: 0,
    units: '',
  }

  public revolveRates = new Subject<RevolveRates>();
  public displayValues = new Subject<DisplayValues>();


  constructor() { }


  calculate(input: FormGroup): void {
    const {
      airspeedKph,
      airspeedKnots,
      altitude,
      battVoltage,
      location,
      motorVoltage,
      propDiameterIn,
      propDiameterMm,
      units,
    } = input.value;

    this.feetPerSecond = parseFloat((((((propDiameterIn * Math.PI) * (battVoltage * motorVoltage)) / 12) / 60) + (airspeedKnots * 1.68781)).toFixed(2));
    this.metersPerSecond = parseFloat((((((propDiameterMm * Math.PI) * (battVoltage * motorVoltage)) / 1000) / 60) + (airspeedKph * 0.277778)).toFixed(2));
    this.revolveRates.next({ feetPerSecond: this.feetPerSecond, metersPerSecond: this.metersPerSecond });

    console.log(this.feetPerSecond, this.metersPerSecond)
    this.revolveRates.subscribe(console.log)
  }

}
