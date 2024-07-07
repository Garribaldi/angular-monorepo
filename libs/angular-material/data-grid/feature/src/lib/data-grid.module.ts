import { NgModule } from '@angular/core';
import { DataGridComponent } from './data-grid.component';
import { DataGridUiModule } from '@local/angular-material/data-grid/ui';
import { SharedUtilsModule } from '@local/shared/utils';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    DataGridUiModule,
    SharedUtilsModule,
    TranslateModule,
    MatExpansionPanelHeader,
    FaIconComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelTitle
  ],
  declarations: [
    DataGridComponent
  ],
  exports: [
    DataGridComponent
  ]
})
export class DataGridModule {
}
