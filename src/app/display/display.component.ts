import { Component, Input, OnInit } from '@angular/core';

import { FormInputs, WeatherConditions } from '../../models';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  @Input() formInputs!: FormInputs;
  @Input() weatherConditions!: WeatherConditions;

  constructor() { }

  ngOnInit(): void {

    console.log(this.formInputs);
  }

}
