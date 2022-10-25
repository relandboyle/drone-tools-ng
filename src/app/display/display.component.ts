import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { DisplayValues, RevolveRates, WeatherData } from '../../constants/interfaces';
import { CalculationsService } from '../services/calculations.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  cityZip: string = '';
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
    console.log(this.cityZip, this.values, this.weather);

    this.activateSubscriptions();

    console.log(this.cityZip, this.values, this.weather);
  }


  activateSubscriptions() {
    this.calcsService.displayValues.subscribe({
      next: values => {
        console.log('DISPLAY VALUES', values);
        this.values = values;
      }
    });

    this.calcsService.revolveRates.subscribe({
      next: rates => {
        console.log('REVOLVE RATES', rates);
        this.revolveRates = rates;
      }
    });

    this.wxService.cityZip.subscribe({
      next: zip => {
        this.cityZip = zip;
        this.getWeather();
      },
      error: err => console.error('Weather Service error:', err),
      complete: () => console.log('Subscribed to Weather Service')
    });
  }


  calculateMachNumber() {
    // const machNumber: number = (localMach1Mps) ? parseFloat((this.revolveRates.metersPerSecond / localMach1Mps).toFixed(2)) : 0;
  }


  getWeather() {
    this.wxService.getWeather(this.cityZip)
    .subscribe({
      next: res => this.weather = res,
      error: err => console.error('Weather Fetch error:', err),
      complete: () => console.log('getWeather COMPLETE', this.weather)
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
