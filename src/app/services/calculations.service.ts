import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MachValues, TipSpeeds } from '../../constants/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  altitude: number = 0;
  public propTipSpeeds = new Subject<TipSpeeds>();
  public machValues = new Subject<MachValues>()


  constructor() { }


  calculatePropTipSpeed(input: FormGroup): void {
    const {
      altitude,
      airspeedKph,
      airspeedKnots,
      battVoltage,
      motorVoltage,
      propDiameterIn,
      propDiameterMm,
    } = input.value;

    this.altitude = altitude;
    const feetPerSecond = parseFloat((((((propDiameterIn * Math.PI) * (battVoltage * motorVoltage)) / 12) / 60) + (airspeedKnots * 1.68781)).toFixed(2));
    const metersPerSecond = parseFloat((((((propDiameterMm * Math.PI) * (battVoltage * motorVoltage)) / 1000) / 60) + (airspeedKph * 0.277778)).toFixed(2));

    console.log(feetPerSecond, metersPerSecond);

    this.propTipSpeeds.next({
      feetPerSecond,
      metersPerSecond
    });
  }


  calculateLocalMach1(temp_c: number, altitude: number) {

    console.log('LocalMach1', temp_c, altitude)

    // // calculate temperature at user input altitude
    // const localTemp_c: number = wx.current.temp_c - (inputs.altitude / 500);
    // // calculate local Mach 1 MPS accounting for temp
    // const localMach1Mps: number = parseFloat((331.3 + (0.6 * localTemp_c)).toFixed(1));
    // // calculate local Mach 1 MPS -> FPS conversion
    // const localMach1Fps: number = parseFloat((localMach1Mps * 3.28084).toFixed(1));
  }

}
