import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MachValues, TipSpeeds } from '../../constants/interfaces';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  altitude: number = 0;
  temp_c!: number;
  public propTipSpeeds = new Subject<TipSpeeds>();
  public machValues = new Subject<MachValues>()


  constructor(
    private wxService: WeatherService
  ) { }


  calculatePropTipSpeed(input: FormGroup): void {
    const {
      altitude,
      airspeedKph,
      airspeedKnots,
      battVoltage,
      motorVoltage,
      propDiameterIn,
      propDiameterMm,
      units,
    } = input.value;

    this.altitude = altitude;
    const feetPerSecond = parseFloat((((((propDiameterIn * Math.PI) * (battVoltage * motorVoltage)) / 12) / 60) + (airspeedKnots * 1.68781)).toFixed(2));
    const metersPerSecond = parseFloat((((((propDiameterMm * Math.PI) * (battVoltage * motorVoltage)) / 1000) / 60) + (airspeedKph * 0.277778)).toFixed(2));

    this.propTipSpeeds.next({
      altitude,
      feetPerSecond,
      metersPerSecond,
      units,
    });
  }


  calculateLocalMach1() {

    this.wxService.temp_c.subscribe(temp_c => {
      console.log('calculateLocalMach1', temp_c, this.altitude)

      // calculate temperature at user input altitude
      const localTemp_c: number = temp_c - (this.altitude / 500);
      // calculate local Mach 1 MPS accounting for temp
      const localMach1Mps: number = parseFloat((331.3 + (0.6 * localTemp_c)).toFixed(1));
      // calculate local Mach 1 MPS -> FPS conversion
      const localMach1Fps: number = parseFloat((localMach1Mps * 3.28084).toFixed(1));

      this.machValues.next({
        localMach1Fps,
        localMach1Mps,
      });
    })

  }

}
