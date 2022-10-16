import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  weather: any;

  @Input() blur = false;

  constructor(private wxService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.wxService.getWeather().subscribe({
      next: res => this.weather = res,
      error: err => console.error(err),
      complete: () => console.log(this.weather)
    });
  }

}
