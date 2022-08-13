import { Component } from '@angular/core';

import { formInputs, FormInputs, weatherConditions, WeatherConditions } from 'src/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  blur: boolean = false;
  inputs: FormInputs = formInputs;
  conditions: WeatherConditions = weatherConditions;

  constructor() { }
}
