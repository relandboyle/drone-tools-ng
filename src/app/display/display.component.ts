import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormInputs, WeatherConditions } from '../../models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  @Input() formInputs!: FormInputs;
  @Input() weatherConditions!: WeatherConditions;
  cityZip: string = '';
  weatherKey: string = environment.apiKey;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.weatherConditions.cityZip = '11225';
    this.cityZip = this.weatherConditions.cityZip;
    console.log(this.weatherConditions);

  }

  getWeather() {
    const requestUrl = `https://api.weatherapi.com/v1/current.json?key=${this.weatherKey}&q=${this.cityZip}&aqi=no`;

    this.http.get(requestUrl).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => console.error(err),
      complete: () => {
        console.log('getWeather COMPLETE');
      }
    })
  }

}
