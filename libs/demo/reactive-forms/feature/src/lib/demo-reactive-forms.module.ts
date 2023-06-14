import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { demoReactiveFormsFeatureRoutes } from './lib.routes';
import { DemoReactiveFormsComponent } from './demo-reactive-forms.component';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedUtilsModule } from "@local/shared/utils";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(demoReactiveFormsFeatureRoutes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedUtilsModule
  ],
  declarations: [DemoReactiveFormsComponent],
  exports: [DemoReactiveFormsComponent],
})
export class DemoReactiveFormsModule {}
