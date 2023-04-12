import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { MatSliderModule } from "@angular/material/slider";

@NgModule({
  imports: [CommonModule, MatSliderModule],
  declarations: [SliderComponent],
  exports: [SliderComponent],
})
export class AngularMaterialFeatureSliderModule {
}
