import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SliderConfig, SliderType, SliderValues } from './slider.model';

@Component({
  selector: 'local-angular-material-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  @Input() type?: SliderType;
  @Input() headline = '';
  @Input() config: SliderConfig = {};
  @Input() values: SliderValues = {};

  sliderType = SliderType;

  private currentValue: SliderValues = {};

  @Output() resultValues = new EventEmitter<SliderValues>();

  ngOnInit() {
    this.currentValue = {...this.values};
  }

  valueChanged(newValue: Partial<SliderValues>) {
    this.currentValue = {...this.currentValue, ...newValue};
    this.resultValues.emit(this.currentValue);
  }
}
