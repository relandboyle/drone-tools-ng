import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { DisplayValues, RevolveRates, WeatherData } from '../../constants/interfaces';
import { CalculationsService } from '../services/calculations.service';
import { catchError, from, of, map, Observable, tap, Subject, switchMap, mergeMap, merge, mergeAll, concat, concatMap, scan, pluck, toArray, filter, pairs, expand, exhaustMap } from 'rxjs';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  fpsTipSpeedString: string = '';
  machNumber: number = 0;
  mpsTipSpeedString: string = '';
  revolveRates!: RevolveRates;
  values!: DisplayValues;
  weather!: WeatherData;
  @Input() blur = false;


  constructor(
    private wxService: WeatherService,
    private calcsService: CalculationsService
  ) { }


  ngOnInit(): void {

    this.calcsService.displayValues.subscribe({
      next: values => {
        console.log('DISPLAY VALUES', values);
        this.values = values;
      },
      error: err => console.error('Error calculating values', err),
      complete: () => console.log('Subscribed to calculations', this.values)
    });

    this.wxService.weather.subscribe({
      next: wx => {
        this.weather = wx;
        console.log('WEATHER VALUES', this.weather);
      }
    });

  }



  calculateMachNumber() {
    // const machNumber: number = (localMach1Mps) ? parseFloat((this.revolveRates.metersPerSecond / localMach1Mps).toFixed(2)) : 0;
  }


  // constructStrings() {
  //   const temperature: string = (this.values.units === 'imperial') ? `${this.weather.temp_f}f` : `${this.weather.temp_f}c`;
  //   const pressure: string = (this.values.units === 'imperial') ? `${this.weather.temp_f}"Hg` : `${this.weather.temp_f}mb`;
  //   const fpsTipSpeedString: string = (feetPerSecond) ? `${this.weather.temp_f} ft/sec` : '(enter specs below)';
  //   const mpsTipSpeedString: string = (metersPerSecond) ? `${this.weather.temp_f} m/sec` : '(enter specs below)';
  //   const fpsLocalMach1String: string = (localMach1Fps) ? `${this.weather.temp_f} ft/sec` : '(enter location below)';
  //   const mpsLocalMach1String: string = (localMach1Mps) ? `${this.weather.temp_f} m/sec` : '(enter location below)';
  // }

}
