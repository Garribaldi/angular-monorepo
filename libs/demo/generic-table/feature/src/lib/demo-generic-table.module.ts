import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { demoGenericTableFeatureRoutes } from './lib.routes';
import { DemoGenericTableComponent } from './demo-generic-table.component';
import { GenericTableModule } from "@local/generic-table/feature";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(demoGenericTableFeatureRoutes),
    GenericTableModule
  ],
  declarations: [DemoGenericTableComponent],
  exports: [DemoGenericTableComponent],
})
export class DemoGenericTableModule {}
