import { Component, Inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  data: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: InjectionToken<any>
  ) {
    this.data = data;
    console.log(this.data);
  }

}
