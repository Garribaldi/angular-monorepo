import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SliderConfig, SliderResultValue, SliderType } from "./slider.model";

@Component({
  selector: 'local-angular-material-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit{

  @Input() type?: SliderType;
  @Input() headline = '';
  @Input() config: SliderConfig = {};

  @Input() values: SliderResultValue = {};

  sliderType = SliderType;

  private currentValue: SliderResultValue = {};

  @Output() resultValues = new EventEmitter<SliderResultValue>();

  ngOnInit() {
    this.currentValue = {...this.values};
  }

  valueChanged(newValue: SliderResultValue) {
    this.currentValue = {...this.currentValue, ...newValue};
    this.resultValues.emit(this.currentValue);
  }
}
