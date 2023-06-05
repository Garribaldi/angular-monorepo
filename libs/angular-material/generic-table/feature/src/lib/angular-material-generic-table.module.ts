import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table.component';
import { MatTableModule } from '@angular/material/table';
import { SharedUtilsModule } from '@local/shared/utils';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    SharedUtilsModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
  ],
  declarations: [GenericTableComponent],
  exports: [GenericTableComponent],
})
export class AngularMaterialGenericTableModule {}
