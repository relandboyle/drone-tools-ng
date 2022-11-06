import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  cityZip: string = '';
  weatherData: any = {};
  weatherKeys: string[] = [
    'humidity',
    'pressure_in',
    'pressure_mb',
    'temp_c',
    'temp_f',
    'text',
    'wind_dir',
    'wind_kph',
    'wind_mph',
    'country',
    'name',
    'region',
  ]

  private weatherUrl = environment.weatherUrl;
  public localMach1 = new Subject<number>();
  public temp_c = new Subject<number>();
  public weather = new Subject<any>();


  constructor(
    private http: HttpClient,
  ) { }


  getWeather(location: string): void {
    const headers = new HttpHeaders;
    const wxResponse = this.http.get(this.weatherUrl, {
      headers: headers,
      params: {
        location: location
      }
    });

    wxResponse.subscribe({
      next: wx => {
        const stage1 = Object.entries(wx).map(entry => entry[1]);
        const stage2 = { ...stage1[0], ...stage1[1], text: stage1[1].condition.text };
        delete stage2.condition;
        this.weatherKeys.forEach((key: string) => {
          this.weatherData[key] = stage2[key]
        });

        this.temp_c.next(stage2.temp_c);
        this.weather.next(this.weatherData);
      },
      error: err => console.error('Error fetching weather:', err),
      complete: () => console.log('Fetch weather complete')
    });
  }


  calculateLocalMach1(localTemp: number, altitude?: number): void {
    // use standard mach 1 and local temp and optionally altitude to calculate local mach 1
  }

}
