import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { AppData } from '../app-data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  weather: any;
  data: string = '';

  @Input() blur = false;

  constructor(
    private weatherService: WeatherService,
    ) { }

  ngOnInit(): void { }

  getWeather() {
  this.weatherService.getWeather().subscribe(
    (response) => {
      this.weather = response;
      console.log(this.weather);
    })
  }

  nameChange(e: any) {
    console.log(e.target.value);
    console.log(e);
    console.log(this.data);
  }

}
