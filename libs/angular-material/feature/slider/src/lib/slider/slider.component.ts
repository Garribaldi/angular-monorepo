import { Component } from '@angular/core';

@Component({
  selector: 'angular-material-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  minChanged($event: number) {
    console.warn($event);
  }


  maxChanged($event: number) {
    console.warn($event);
  }
}
