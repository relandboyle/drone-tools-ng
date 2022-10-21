import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { InputValues, WeatherData } from './../types/interfaces';
import { InputStore } from '../constants/input-values';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  cityZip: string = '';
  inputs: InputValues = InputStore;
  weather!: WeatherData;

  @Input() blur?: boolean = false;
  @Input() location = '';
  @Input() wxConditions = '';
  @Input() wxHumidity = '';
  @Input() temperature = '';
  @Input() pressure = '';
  @Input() units = '';
  @Input() machNumber = '';
  @Input() metersPerSecond = '';
  

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
