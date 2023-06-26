import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedUtilsModule } from '@local/shared/utils';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailFieldComponent } from './email-field/email-field.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    SharedUtilsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  declarations: [
    PasswordFieldComponent,
    EmailFieldComponent,
    TextFieldComponent,
    SelectFieldComponent
  ],
  exports: [
    PasswordFieldComponent,
    EmailFieldComponent,
    TextFieldComponent,
    SelectFieldComponent
  ],
})
export class ReactiveFieldsModule {}
