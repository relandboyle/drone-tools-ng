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
    airspeedStore: 0,
    airspeedKph: 0,
    airspeedKnots: 0,
    altitude: 0,
    battVoltage: 0,
    location: '',
    motorVoltage: 0,
    propDiameterStore: 0,
    propDiameterIn: 0,
    propDiameterMm: 0,
    units: '',
  }

  public revolveRates = new Subject<RevolveRates>();
  public displayValues = new Subject<DisplayValues>();


  constructor() { }


  calculate(input: FormGroup): void {

  }


  // handlePropDiameter(propDiameter: number): void {
  //   if (this.inputs.units === 'imperial') {
  //     this.inputs.propDiameterIn = propDiameter;
  //     this.inputs.propDiameterMm = parseFloat((propDiameter * 25.4).toFixed(1));
  //   }
  //   if (this.inputs.units === 'metric') {
  //     this.inputs.propDiameterIn = parseFloat((propDiameter / 25.4).toFixed(1));
  //     this.inputs.propDiameterMm = propDiameter;
  //   }
  // }


  // handleAirspeed(airspeed: number) {
  //   if (this.inputs.units === 'imperial') {
  //     this.inputs.airspeedKnots = airspeed;
  //     this.inputs.airspeedKph = parseFloat((airspeed * 1.852).toFixed(1));
  //   }
  //   if (this.inputs.units === 'metric') {
  //     this.inputs.airspeedKnots = parseFloat((airspeed * 0.539957).toFixed(1));
  //     this.inputs.airspeedKph = airspeed;
  //   }
  // }


  calculateTipSpeed() {
    const {
      airspeedKph,
      airspeedKnots,
      battVoltage,
      motorVoltage,
      propDiameterIn,
      propDiameterMm,
    } = this.inputs;

    this.feetPerSecond = parseFloat((((((propDiameterIn * Math.PI) * (battVoltage * motorVoltage)) / 12) / 60) + (airspeedKnots * 1.68781)).toFixed(2));
    this.metersPerSecond = parseFloat((((((propDiameterMm * Math.PI) * (battVoltage * motorVoltage)) / 1000) / 60) + (airspeedKph * 0.277778)).toFixed(2));
    this.revolveRates.next({ feetPerSecond: this.feetPerSecond, metersPerSecond: this.metersPerSecond });
  }

}
