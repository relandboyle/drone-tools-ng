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

  fpsTipSpeedString: string = '';
  mpsTipSpeedString: string = '';
  propTipSpeeds!: TipSpeeds;
  machValues!: MachValues;
  units: string = '';
  weather!: WeatherData;
  @Input() blur = false;

  public temp_c = new Subject<number>();


  constructor(
    private wxService: WeatherService,
    private calcsService: CalculationsService
  ) { }


  ngOnInit(): void {

    this.calcsService.propTipSpeeds.subscribe(values => {
      this.propTipSpeeds = values;
      console.log('TIP SPEEDS', this.propTipSpeeds);
    });

    this.wxService.weather.subscribe(wx => {
      this.weather = wx;
      this.temp_c.next(wx.temp_c);
      console.log('WEATHER VALUES', this.weather);
    });

    this.calcsService.machValues.subscribe(values => {
      this.machValues = values;
      console.log('MACH VALUES', this.machValues);
    });


  }


  // constructStrings() {
  //   const temperature: string = (this.values.units === 'imperial') ? `${this.weather.temp_f}f` : `${this.weather.temp_f}c`;
  //   const pressure: string = (this.values.units === 'imperial') ? `${this.weather.temp_f}"Hg` : `${this.weather.temp_f}mb`;
  //   const fpsTipSpeedString: string = (feetPerSecond) ? `${this.weather.temp_f} ft/sec` : '(enter specs below)';
  //   const mpsTipSpeedString: string = (metersPerSecond) ? `${this.weather.temp_f} m/sec` : '(enter specs below)';
  //   const fpsLocalMach1String: string = (localMach1Fps) ? `${this.weather.temp_f} ft/sec` : '(enter location below)';
  //   const mpsLocalMach1String: string = (localMach1Mps) ? `${this.weather.temp_f} m/sec` : '(enter location below)';
  // }

}
