import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { InputValues } from '../constants/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  public storedInput = new Subject<InputValues>();

  constructor() { }

  calculateMach1(inputs: FormGroup) {

    
  }
}
