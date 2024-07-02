import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridCheckFilterComponent } from './data-grid-check-filter/data-grid-check-filter.component';
import { DataGridChipsBarComponent } from './data-grid-chips-bar/data-grid-chips-bar.component';
import { DataGridDateFilterComponent } from './data-grid-date-filter/data-grid-date-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedUtilsModule } from '@local/shared/utils';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DataGridBooleanFilterComponent } from './data-grid-boolean-filter/data-grid-boolean-filter.component';
import { DataGridNumericFilterComponent } from './data-grid-numeric-filter/data-grid-numeric-filter.component';
import { DataGridSearchFilterComponent } from './data-grid-search-filter/data-grid-search-filter.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { DataGridUtilsModule } from '@local/angular-material/data-grid/utils';
import { DataGridColumnComponent } from './data-grid-column/data-grid-column.component';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatSlider, MatSliderRangeThumb } from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    SharedUtilsModule,
    MatChipsModule,
    MatIconModule,
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule,
    FaIconComponent,
    TranslateModule,
    DataGridUtilsModule,
    MatRadioGroup,
    FormsModule,
    MatRadioButton,
    MatSlider,
    MatSliderRangeThumb
  ],
  declarations: [
    DataGridCheckFilterComponent,
    DataGridChipsBarComponent,
    DataGridDateFilterComponent,
    DataGridBooleanFilterComponent,
    DataGridNumericFilterComponent,
    DataGridSearchFilterComponent,
    DataGridColumnComponent
  ],
  exports: [
    DataGridColumnComponent,
    DataGridChipsBarComponent
  ]
})
export class DataGridUiModule {
}
