import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private url = environment.weatherUrl;
  public cityZip = new Subject<string>();

  constructor(
    private http: HttpClient,
  ) { }

  getWeather(location: string): Observable<any> {
    const headers = new HttpHeaders;
    return this.http.get(this.url, {
      headers: headers,
      params: {
        location: location
      }
    });
  }

  storeCityZip(input: string) {
    this.cityZip.next(input);
  }

}
