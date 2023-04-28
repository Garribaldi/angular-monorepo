import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './ui/filter/filter.component';
import { FilterShellComponent } from './ui/filter-shell/filter-shell.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FilterComponent, FilterShellComponent],
  exports: [FilterComponent, FilterShellComponent],
})
export class AngularMaterialFeatureFilterModule {}
