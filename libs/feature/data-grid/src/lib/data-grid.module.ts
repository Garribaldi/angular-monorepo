import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid.component';
import { DataGridColumnComponent } from './ui/data-grid-column/data-grid-column.component';
import { DataGridCheckFilterComponent } from './ui/data-grid-check-filter/data-grid-check-filter.component';
import { DataGridDateFilterComponent } from './ui/data-grid-date-filter/data-grid-date-filter.component';
import { DataGridChipsBarComponent } from './ui/data-grid-chips-bar/data-grid-chips-bar.component';
import { DataGridSearchFilterComponent } from './ui/data-grid-search-filter/data-grid-search-filter.component';
import { DataGridBooleanFilterComponent } from './ui/data-grid-boolean-filter/data-grid-boolean-filter.component';
import { DataGridNumericFilterComponent } from './ui/data-grid-numeric-filter/data-grid-numeric-filter.component';
import { IsFilterPipe } from './utils/pipes/is-filter.pipe';
import { IsFilterArrayPipe } from './utils/pipes/is-filter-array.pipe';
import { FilterColumnMapperPipe } from './utils/pipes/filter-column-mapper.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatNestedTreeNode, MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodeOutlet, MatTreeNodeToggle } from '@angular/material/tree';
import { MatCheckbox } from '@angular/material/checkbox';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatDatepickerToggle, MatDateRangeInput, MatDateRangePicker, MatEndDate, MatStartDate } from '@angular/material/datepicker';
import { MatSlider, MatSliderRangeThumb } from '@angular/material/slider';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelTitle } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatRadioGroup,
    FormsModule,
    MatRadioButton,
    MatTreeNode,
    MatTree,
    MatCheckbox,
    MatNestedTreeNode,
    FaIconComponent,
    MatFormField,
    MatButton,
    MatTreeNodeOutlet,
    MatIconButton,
    MatTreeNodeToggle,
    MatInput,
    MatTreeNodeDef,
    MatChipListbox,
    MatChipOption,
    MatDateRangeInput,
    MatStartDate,
    MatEndDate,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatSlider,
    MatSliderRangeThumb,
    MatSuffix,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription
  ],
  declarations: [
    DataGridComponent,
    DataGridColumnComponent,
    DataGridCheckFilterComponent,
    DataGridDateFilterComponent,
    DataGridChipsBarComponent,
    DataGridSearchFilterComponent,
    DataGridBooleanFilterComponent,
    DataGridNumericFilterComponent,
    IsFilterPipe,
    IsFilterArrayPipe,
    FilterColumnMapperPipe,
  ],
  exports: [
    DataGridComponent,
    DataGridColumnComponent
  ]
})
export class DataGridModule {
}
