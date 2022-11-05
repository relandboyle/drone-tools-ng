import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { catchError, from, of, map, Observable, tap, Subject, switchMap, mergeMap, merge, mergeAll, concat, concatMap, scan, pluck, toArray, filter, pairs, expand } from 'rxjs';
import { WeatherData } from 'src/constants/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherStore: any;
  weatherData: WeatherData = {
    humidity: 0,
    pressure_in: 0,
    pressure_mb: 0,
    temp_c: 0,
    temp_f: 0,
    wind_dir: '',
    wind_kph: 0,
    wind_mph: 0,
    country: '',
    name: '',
    region: '',
  }

  private url = environment.weatherUrl;
  public cityZip = new Subject<string>();
  public localMach1 = new Subject<number>();


  constructor(
    private http: HttpClient,
  ) { }


  getWeather(location: string): Observable<any> {
    const headers = new HttpHeaders;
    const weather = this.http.get(this.url, {
      headers: headers,
      params: {
        location: location
      }
    }).pipe(

    );



    // return of(this.weatherData);
    return weather;

  }


  storeCityZip(input: string) {
    this.cityZip.next(input);
  }


  calculateLocalMach1(localTemp: number, altitude?: number) {
    // use standard mach 1 and local temp and optionally altitude to calculate local mach 1
  }

}
