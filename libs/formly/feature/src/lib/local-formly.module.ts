import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalFormlyComponent } from './local-formly.component';
import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    MatButtonModule
  ],
  declarations: [LocalFormlyComponent],
  exports: [LocalFormlyComponent],
})
export class LocalFormlyModule {}
