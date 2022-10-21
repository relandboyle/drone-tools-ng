import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { InputValues, WeatherData } from '../types/interfaces';
import { InputStore } from '../constants/input-values';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  cityZip: string = '';
  myData: any = [];
  weather: any;
  inputs: InputValues = InputStore;

  @Input() blur = false;


  constructor(
    private wxService: WeatherService
    ) { }

  ngOnInit(): void { }

  sendCityZip() {
    this.wxService.storeCityZip(this.cityZip);
  }

}
