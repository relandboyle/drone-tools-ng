import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  @Input() blur = false;
  @Input() location = '';
  @Input() wxConditions = '';
  @Input() wxHumidity = '';
  @Input() temperature = '';
  @Input() pressure = '';
  @Input() units = '';
  @Input() machNumber = '';
  @Input() metersPerSecond = '';
  @Input() weather = {};

  constructor() { }

  ngOnInit(): void {
  }

}
