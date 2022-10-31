import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CalculationsService } from '../services/calculations.service';
import { combineLatest, combineLatestAll, forkJoin, merge, Observable, withLatestFrom, tap, zip, from, of, mergeWith } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  inputForm!: FormGroup;
  location: string = '';
  @Input() blur = false;


  constructor(
    private wxService: WeatherService,
    private calcsService: CalculationsService,
    private fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.initializeForm();
    this.syncValues();
    // this.syncForks();
  }


  initializeForm(): void {
    this.inputForm = this.fb.group({
      airspeedStore: new FormControl(),
      airspeedKph: new FormControl(),
      airspeedKnots: new FormControl(),
      altitude: new FormControl(),
      battVoltage: new FormControl(),
      location: new FormControl(''),
      motorVoltage: new FormControl(),
      propDiameterStore: new FormControl(),
      propDiameterIn: new FormControl(),
      propDiameterMm: new FormControl(),
      units: new FormControl('imperial'),
    });
  }


  // syncForks(): void {
  //   const form = this.inputForm;

  //   const inches = form.controls['propDiameterIn'].valueChanges
  //   const metric = form.controls['propDiameterMm'].valueChanges
  //   const store = form.controls['propDiameterStore'].valueChanges
  //   const units = form.controls['units'].valueChanges

  //   inches.pipe(
  //     mergeWith(metric, units)
  //   )
  //   .subscribe(s => console.log(s))


  // }


  syncValues(): void {
    const form = this.inputForm;
    const noEmit = { onlySelf: true, emitEvent: false };
    const diameterInput = document.querySelector('.propDiameter');

    const merged = merge(
      form.controls['propDiameterIn'].valueChanges,
      form.controls['propDiameterMm'].valueChanges,
      form.controls['units'].valueChanges
    );

    merged.subscribe(mergedValues => {
      console.log('MERGED', mergedValues);
    })



    // units.pipe(
    //   mergeWith(propDiameterIn, propDiameterMm, airspeedKnots, airspeedKph)
    // )
    form.valueChanges
    .subscribe(s => {
      console.log(s);
      // if (form.value.units === 'imperial') {
      //   form.patchValue({
      //     propDiameterIn: form.value.propDiameterStore || null,
      //     airspeedStore: form.value.airspeedKnots || null,
      //     propDiameterMm: parseFloat((form.value.propDiameterStore * 25.4).toFixed(2)) || null,
      //     airspeedKph: parseFloat((form.value.airspeedKnots * 1).toFixed(1)) || null
      //   }, noEmit);
      // }
      // else if (form.value.units === 'metric') {
      //   form.patchValue({
      //     propDiameterMm: form.value.propDiameterStore || null,
      //     airspeedStore: form.value.airspeedKph || null,
      //     propDiameterIn: parseFloat((form.value.propDiameterStore / 25.4).toFixed(1)) || null,
      //     airspeedKnots: parseFloat((form.value.airspeedKph * 1).toFixed(1)) || null
      //   }, noEmit);
      //   if (form.controls['propDiameterIn'].pristine) {
      //     form.patchValue({
      //     }, noEmit);
      //   }
      // }
    });


    form.get('units')?.valueChanges.subscribe(units => {
      // console.log(units);
      if (units === 'imperial') {
        console.log('IMPERIAL')
        form.controls['propDiameterIn'].markAsPristine();
        form.controls['airspeedKph'].markAsPristine();

      }
      else if (units === 'metric') {
        console.log('METRIC')
        form.controls['propDiameterMm'].markAsPristine();
        form.controls['airspeedKnots'].markAsPristine();

      }
    });

    // form.valueChanges.subscribe(input => {
    //   if (form.value.units === 'imperial') {
    //     form.patchValue({
    //       airspeedStore: input.airspeedKnots,
    //       propDiameterStore: input.propDiameterIn,
    //       airspeedKph: parseFloat((input.airspeedKnots * 1.852).toFixed(1)) || null,
    //       // propDiameterMm: parseFloat((form.value.propDiameterIn * 25.4).toFixed(1)) || null,
    //     },
    //     {
    //       onlySelf: true, emitEvent: false,
    //     });
    //     if (form.controls['propDiameterMm'].pristine) {
    //       form.patchValue({
    //         propDiameterMm: parseFloat((form.value.propDiameterIn * 25.4).toFixed(2)) || null,
    //       },
    //       {
    //         onlySelf: true, emitEvent: false,
    //       });
    //     }
    //   }
    //   else if (form.value.units === 'metric') {
    //     form.patchValue({
    //       airspeedStore: input.airspeedKph,
    //       propDiameterStore: input.propDiameterMm,
    //       airspeedKnots: parseFloat((input.airspeedKph * 0.539957).toFixed(2)) || null,
    //       // propDiameterIn: parseFloat((form.value.propDiameterMm / 25.4).toFixed(2)) || null,
    //     },
    //     {
    //       onlySelf: true, emitEvent: false,
    //     });
    //     if (form.controls['propDiameterIn'].pristine) {
    //       form.patchValue({
    //         propDiameterIn: parseFloat((form.value.propDiameterMm / 25.4).toFixed(1)) || null,
    //       },
    //       {
    //       onlySelf: true, emitEvent: false,
    //       });
    //     }
    //   }
    // });

  }


  submitValues(): void {
    console.log(Object.entries(this.inputForm.value).forEach((value: any) => {
      console.log(value)
    }))
    Object.entries(this.inputForm.controls).forEach((value: any) => {
      console.table(value[1].pristine, value[0])
    })
  }


  sendLocation(): void {
    this.wxService.storeCityZip(this.inputForm.value.location);
  }

}
