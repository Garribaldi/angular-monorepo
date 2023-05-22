import { Component } from '@angular/core';
import { SliderConfig, SliderResultValue, SliderType } from "@local/angular-material/feature/slider";

@Component({
  selector: 'local-angular-material-slider-shell',
  templateUrl: './slider-shell.component.html',
  styleUrls: ['./slider-shell.component.scss'],
})
export class SliderShellComponent {

  sliderBasicType = SliderType.BASIC;
  sliderBasicConfig: SliderConfig = {min: 1, max: 50, step: 0.5};
  sliderBasicValues: SliderResultValue = {value: 5};
  sliderBasicResult: SliderResultValue;

  sliderRangeType = SliderType.RANGE;
  sliderRangeConfig: SliderConfig = {min: 1, max: 75};
  sliderRangeValues: SliderResultValue = {minValue: 5, maxValue: 30};
  sliderRangeResult: SliderResultValue;


  constructor() {
    this.sliderBasicResult = {...this.sliderBasicValues};
    this.sliderRangeResult = {...this.sliderRangeValues};
  }

  basicSliderChange(result: SliderResultValue) {
    this.sliderBasicResult = result;
  }

  rangeSliderChange(result: SliderResultValue) {
    this.sliderRangeResult = result;
  }
}
