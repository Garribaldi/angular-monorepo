import { NgModule } from '@angular/core';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DataGridColumnComponent } from './data-grid-column/data-grid-column.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DataSourceService, SelectedFilterStateService } from '@local/angular-material/data-grid/data-access';
import { AngularMaterialDataGridUiModule } from "@local/angular-material/data-grid/ui";
import { SharedUtilsModule } from "@local/shared/utils";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialDataGridUiModule,
    SharedUtilsModule
  ],
  declarations: [
    DataGridComponent,
    DataGridColumnComponent
  ],
  exports: [
    DataGridComponent,
    DataGridColumnComponent
  ],
  providers: [
    DataSourceService,
    SelectedFilterStateService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-DE',
    },
  ],
})
export class AngularMaterialDataGridModule {}
