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

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void { }

  getWeather = this.weatherService.getWeather().subscribe(
    (response) => { this.weather = response },
    (error) => { console.log(error); }
  )

}
