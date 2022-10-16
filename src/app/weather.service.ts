import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private url = `https://api.weatherapi.com/v1/current.json?key=${environment.weatherKey}&q=11225&aqi=no`;

  constructor(
    private http: HttpClient,
  ) { }

  getWeather(): Observable<any> {
    return this.http.get(this.url);
  }

}
