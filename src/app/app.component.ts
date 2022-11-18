import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drone-tools-ng';
  blur!: boolean;

  toggleBlur(blur: boolean) {
    console.log(blur)
    this.blur = blur;
  }
}
