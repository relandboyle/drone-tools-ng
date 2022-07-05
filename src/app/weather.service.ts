import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private url = 'https://api.weatherapi.com/v1/current.json?q=11225&aqi=no';

  constructor(private http: HttpClient) { }

  getWeather() {
    return this.http.get(this.url);
  }

}
