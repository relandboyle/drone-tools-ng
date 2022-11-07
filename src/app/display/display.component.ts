import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { MachValues, TipSpeeds, WeatherData } from '../../constants/interfaces';
import { CalculationsService } from '../services/calculations.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  propTipSpeeds!: TipSpeeds;
  machNumber!: number;
  machValues!: MachValues;
  units!: string;
  weather!: WeatherData;
  @Input() blur!: boolean;

  public temp_c = new Subject<number>();


  constructor(
    private wxService: WeatherService,
    private calcsService: CalculationsService,
  ) { }


  ngOnInit(): void {

    this.calcsService.propTipSpeeds.subscribe(values => {
      this.propTipSpeeds = values;
      if (this.machValues) {
        this.machNumber = parseFloat((this.propTipSpeeds.metersPerSecond / this.machValues.localMach1Mps).toFixed(2));
      }
      // console.log('TIP SPEEDS', this.propTipSpeeds);
    });

    this.calcsService.machValues.subscribe(values => {
      this.machValues = values;
      if (this.propTipSpeeds) {
        this.machNumber = parseFloat((this.propTipSpeeds.metersPerSecond / this.machValues.localMach1Mps).toFixed(2));
      }
      // console.log('MACH VALUES', this.machValues);
    });

    this.wxService.weather.subscribe(wx => {
      this.weather = wx;
      this.temp_c.next(wx.temp_c);
      // console.log('WEATHER VALUES', this.weather);
    });

    this.wxService.units.subscribe(units => {
      this.units = units;
      // console.log(this.units);
    });
  }

}
