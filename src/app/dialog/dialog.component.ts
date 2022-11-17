import { Component, OnInit, Input, Output, EventEmitter, Inject, InjectionToken } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  data: any;
  @Input() dialogMessage: string = 'Default Dialog Message String';
  // @Output() closeDialogEvent = new EventEmitter<string>();

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: InjectionToken<any>
  ) {
    this.data = data;
    console.log(this.data);
  }

  ngOnInit(): void {

    console.log('DialogComponent INIT')
  }


  // closeDialog(event: string) {
  //   this.closeDialogEvent.emit(event);
  // }

}
