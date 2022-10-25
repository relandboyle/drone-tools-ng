import { Injectable } from '@angular/core';
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
    motorVoltage: 0,
    propDiaImperial: 0,
    propDiaMetric: 0,
    units: '',
  }

  public revolveRates = new Subject<RevolveRates>();
  public displayValues = new Subject<DisplayValues>();


  constructor() { }


  calculate(formValues: any): void {
    // transfer a few user inputs from FormBuilder to inputs object
    this.inputs.altitude = formValues.altitude;
    this.inputs.battVoltage = formValues.battVoltage;
    this.inputs.motorVoltage = formValues.motorVoltage;
    this.inputs.units = formValues.units;

    // derive metric and imperial values from user input
    this.handlePropDiameter(formValues.propDiameter);
    this.handleAirspeed(formValues.airspeed);
    this.calculateTipSpeed();

    // send updated inputs object to display component
    this.displayValues.next(this.inputs);
  }


  handlePropDiameter(propDiameter: number): void {
    if (this.inputs.units === 'imperial') {
      this.inputs.propDiaImperial = propDiameter;
      this.inputs.propDiaMetric = parseFloat((propDiameter * 25.4).toFixed(1));
    }
    if (this.inputs.units === 'metric') {
      this.inputs.propDiaImperial = parseFloat((propDiameter / 25.4).toFixed(1));
      this.inputs.propDiaMetric = propDiameter;
    }
  }


  handleAirspeed(airspeed: number) {
    if (this.inputs.units === 'imperial') {
      this.inputs.airspeedKnots = airspeed;
      this.inputs.airspeedKph = parseFloat((airspeed * 1.852).toFixed(1));
    }
    if (this.inputs.units === 'metric') {
      this.inputs.airspeedKnots = parseFloat((airspeed * 0.539957).toFixed(1));
      this.inputs.airspeedKph = airspeed;
    }
  }


  calculateTipSpeed() {
    const {
      airspeedKph,
      airspeedKnots,
      battVoltage,
      motorVoltage,
      propDiaImperial,
      propDiaMetric,
    } = this.inputs;

    this.feetPerSecond = parseFloat((((((propDiaImperial * Math.PI) * (battVoltage * motorVoltage)) / 12) / 60) + (airspeedKnots * 1.68781)).toFixed(2));
    this.metersPerSecond = parseFloat((((((propDiaMetric * Math.PI) * (battVoltage * motorVoltage)) / 1000) / 60) + (airspeedKph * 0.277778)).toFixed(2));
    this.revolveRates.next({ feetPerSecond: this.feetPerSecond, metersPerSecond: this.metersPerSecond });
  }

}
