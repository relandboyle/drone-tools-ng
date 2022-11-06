import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { TipSpeeds, WeatherData } from '../../constants/interfaces';
import { CalculationsService } from '../services/calculations.service';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  fpsTipSpeedString: string = '';
  mpsTipSpeedString: string = '';
  propTipSpeeds!: TipSpeeds;
  units: string = '';
  weather!: WeatherData;
  @Input() blur = false;


  constructor(
    private wxService: WeatherService,
    private calcsService: CalculationsService
  ) { }


  ngOnInit(): void {

    this.calcsService.propTipSpeeds.subscribe({
      next: values => {
        console.log('TIP SPEEDS', values);
        this.propTipSpeeds = values;
      },
      error: err => console.error('Error calculating prop tip speeds', err),
      complete: () => {
        console.log('Subscribed to prop tip speeds', this.propTipSpeeds);
      }
    });

    this.calcsService.calculateLocalMach1(this.weather.temp_c, 0);

    this.wxService.weather.subscribe({
      next: wx => {
        this.weather = wx;
        console.log('WEATHER VALUES', this.weather);
      }
    });

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
