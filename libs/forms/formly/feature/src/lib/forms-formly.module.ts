import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsFormlyComponent } from './forms-formly.component';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormlyModule } from "@ngx-formly/core";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [{name: 'required', message: 'This field is required'}]
    }),
    FormlyMaterialModule,
    MatButtonModule,
  ],
  declarations: [FormsFormlyComponent],
  exports: [FormsFormlyComponent],
})
export class FormsFormlyModule {}
