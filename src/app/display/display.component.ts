import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { MachValues, TipSpeeds, WeatherData, DisplayValues } from '../../constants/interfaces';
import { CalculationsService } from '../services/calculations.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  displayStrings: DisplayValues = {
    enterLocation: 'Local Mach 1: enter location below',
    enterSpecs: 'Tip Speed: enter specs below',
    localMach1Imperial: null,
    localMach1Metric: null,
    machNumber: null,
    pressureImperial: null,
    pressureMetric: null,
    tipSpeedImperial: null,
    tipSpeedMetric: null,
    temperatureImperial: null,
    temperatureMetric: null,
  };
  propTipSpeeds!: TipSpeeds;
  machNumber!: number;
  machValues!: MachValues;
  units: string = 'imperial';
  unitsDisplay = { f: 'f', c: 'c', fps: 'ft/sec', mps: 'm/sec', mb: 'mb', hg: '\"Hg' };
  weather!: WeatherData;

  @Input() blur!: boolean;
  public temp_c = new Subject<number>();


  constructor(
    private wxService: WeatherService,
    private calcsService: CalculationsService,
  ) { }


  ngOnInit(): void {

    this.calcsService.propTipSpeeds.subscribe({
      next: values => {
        this.propTipSpeeds = values;
        this.displayStrings.tipSpeedImperial = `Tip Speed: ${values.feetPerSecond} ${this.unitsDisplay.fps}`;
        this.displayStrings.tipSpeedMetric = `Tip Speed: ${values.metersPerSecond} ${this.unitsDisplay.mps}`;
        if (this.machValues) {
          this.machNumber = this.calculateMachNumber();
          this.displayStrings.machNumber = `Mach: ${this.machNumber}`;
        }
      },
      error: err => console.error(err)
    });

    this.calcsService.machValues.subscribe({
      next: values => {
        this.machValues = values;
        this.displayStrings.localMach1Imperial = `Local Mach 1: ${values.localMach1Fps} ${this.unitsDisplay.fps}`;
        this.displayStrings.localMach1Metric = `Local Mach 1: ${values.localMach1Mps} ${this.unitsDisplay.mps}`;
        if (this.propTipSpeeds) {
          this.machNumber = this.calculateMachNumber();
          this.displayStrings.machNumber = `Mach: ${this.machNumber}`;
        }
      },
      error: err => console.error(err)
    });

    this.wxService.weather.subscribe({
      next: wx => {
        this.weather = wx;
        this.temp_c.next(wx.temp_c);
        this.displayStrings.temperatureImperial = `Temp: ${wx.temp_f}${this.unitsDisplay.f}`;
        this.displayStrings.temperatureMetric = `Temp: ${wx.temp_c}${this.unitsDisplay.c}`;
        this.displayStrings.pressureImperial = `Pressure: ${wx.pressure_in}${this.unitsDisplay.hg}`;
        this.displayStrings.pressureMetric = `Pressure: ${wx.pressure_mb}${this.unitsDisplay.mb}`;
      },
      error: err => console.error(err)
    });

    this.wxService.units.subscribe({
      next: units => {
        this.units = units;
      },
      error: err => console.error(err)
    });
  }

  calculateMachNumber(): number {
    return parseFloat((this.propTipSpeeds.metersPerSecond / this.machValues.localMach1Mps).toFixed(2));
  }

}
