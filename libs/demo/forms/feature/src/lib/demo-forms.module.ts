import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFormsComponent } from './demo-forms.component';
import { FormsFormlyModule } from '@local/forms/formly/feature';
import { DemoFormlyComponent } from './demo-formly/demo-formly.component';
import { DemoReactiveFormsComponent } from "./demo-reactive-forms/demo-reactive-forms.component";
import { SharedUtilsModule } from "@local/shared/utils";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { SharedSubnavModule } from "@local/shared/feature/subnav";
import { DemoFormsRoutingModule } from "./demo-forms-routing.module";
import { ReactiveFieldsModule } from "@local/forms/reactive-fields/feature";

@NgModule({
    imports: [
        CommonModule,
        SharedSubnavModule,
        DemoFormsRoutingModule,
        FormsFormlyModule,
        SharedUtilsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFieldsModule
    ],
  declarations: [
    DemoFormsComponent,
    DemoFormlyComponent,
    DemoReactiveFormsComponent
  ],
  exports: [
    DemoFormsComponent
  ],
})
export class DemoFormsModule {}
