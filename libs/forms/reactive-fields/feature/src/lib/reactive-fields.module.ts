import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SharedUtilsModule } from "@local/shared/utils";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    SharedUtilsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PasswordFieldComponent
  ],
  exports: [
    PasswordFieldComponent
  ]
})
export class ReactiveFieldsModule {}
