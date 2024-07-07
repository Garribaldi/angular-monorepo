import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterColumnMapperPipe } from './pipes/filter-column-mapper.pipe';
import { IsFilterPipe } from './pipes/is-filter.pipe';
import { IsFilterArrayPipe } from './pipes/is-filter-array.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FilterColumnMapperPipe,
    IsFilterPipe,
    IsFilterArrayPipe
  ],
  exports: [
    FilterColumnMapperPipe,
    IsFilterPipe,
    IsFilterArrayPipe
  ]
})
export class DataGridUtilsModule {}
