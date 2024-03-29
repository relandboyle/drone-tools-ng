import { Injectable } from '@angular/core';
import { MachValues, TipSpeeds } from '../../constants/interfaces';
import { WeatherService } from './weather.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  altitude!: number;
  temp_c!: number;
  public propTipSpeeds = new Subject<TipSpeeds>();
  public machValues = new Subject<MachValues>()
  public units = new Subject<string>();


  constructor(
    private wxService: WeatherService,
  ) { }


  calculatePropTipSpeed(input: FormGroup): void {
    const {
      airspeedKph,
      airspeedKnots,
      battVoltage,
      motorVoltage,
      propDiameterIn,
      propDiameterMm,
    } = input.value;

    const feetPerSecond = parseFloat((((((propDiameterIn * Math.PI) * (battVoltage * motorVoltage)) / 12) / 60) + (airspeedKnots * 1.68781)).toFixed(2));
    const metersPerSecond = parseFloat((((((propDiameterMm * Math.PI) * (battVoltage * motorVoltage)) / 1000) / 60) + (airspeedKph * 0.277778)).toFixed(2));

    this.propTipSpeeds.next({
      feetPerSecond,
      metersPerSecond,
    });
  }


  calculateLocalMach1(altitude: number) {

    this.wxService.temp_c.subscribe(temp_c => {
      // calculate temperature at user input altitude
      const localTemp_c: number = temp_c - (altitude / 500);
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
