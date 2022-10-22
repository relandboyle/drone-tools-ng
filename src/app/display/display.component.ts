import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { InputValues, WeatherData } from '../constants/interfaces';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  cityZip: string = '';
  weather!: WeatherData;

  blur?: boolean = false;
  location = '';
  wxConditions = '';
  wxHumidity = '';
  temperature = '';
  pressure = '';
  units = '';
  machNumber = '';
  metersPerSecond = '';
  

  constructor(
    private wxService: WeatherService
  ) { }

  ngOnInit(): void {
    this.wxService.cityZip.subscribe({
      next: zip => {
        this.cityZip = zip;
        this.getWeather();
      }
    });
  }

  getWeather() {
    this.wxService.getWeather(this.cityZip)
    .subscribe({
      next: res => this.weather = res,
      error: err => console.error(err),
      complete: () => console.log('getWeather COMPLETE', this.weather)
    });
  }

}
