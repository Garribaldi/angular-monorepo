import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter/filter.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FilterComponent],
  exports: [FilterComponent],
})
export class AngularMaterialFeatureFilterModule {}
