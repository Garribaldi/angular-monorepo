import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFormlyComponent } from './demo-formly.component';
import { RouterModule } from "@angular/router";
import { routes } from "./lib.routes";
import { LocalFormlyModule } from "../../../../../formly/feature/src";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LocalFormlyModule
  ],
  declarations: [DemoFormlyComponent],
  exports: [DemoFormlyComponent],
})
export class DemoFormlyModule {}
