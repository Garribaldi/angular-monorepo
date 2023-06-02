import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { MatSliderModule } from '@angular/material/slider';
import { SharedUtilsModule } from '@local/shared/utils';

@NgModule({
  imports: [CommonModule, MatSliderModule, SharedUtilsModule],
  declarations: [SliderComponent],
  exports: [SliderComponent],
})
export class AngularMaterialSliderModule {}
