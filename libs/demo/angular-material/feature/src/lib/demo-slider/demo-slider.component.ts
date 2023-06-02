import { Component } from '@angular/core';
import { SliderConfig, SliderType, SliderValues, } from '@local/angular-material/slider/feature';

@Component({
  selector: 'local-demo-angular-material-slider',
  templateUrl: './demo-slider.component.html',
  styleUrls: ['./demo-slider.component.scss'],
})
export class DemoSliderComponent {
  sliderBasicType = SliderType.BASIC;
  sliderBasicConfig: SliderConfig = { min: 1, max: 50, step: 0.5 };
  sliderBasicValues: SliderValues = { value: 5 };
  sliderBasicResult: SliderValues;

  sliderRangeType = SliderType.RANGE;
  sliderRangeConfig: SliderConfig = { min: 1, max: 75 };
  sliderRangeValues: SliderValues = { minValue: 5, maxValue: 30 };
  sliderRangeResult: SliderValues;

  constructor() {
    this.sliderBasicResult = { ...this.sliderBasicValues };
    this.sliderRangeResult = { ...this.sliderRangeValues };
  }

  basicSliderChange(result: SliderValues) {
    this.sliderBasicResult = result;
  }

  rangeSliderChange(result: SliderValues) {
    this.sliderRangeResult = result;
  }
}
