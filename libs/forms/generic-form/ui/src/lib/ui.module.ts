import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './controls/email/email.component';
import { InputComponent } from './controls/input/input.component';
import { SelectComponent } from './controls/select/select.component';
import { PasswordComponent } from './controls/password/password.component';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatError,
    MatLabel,
    MatInput
  ],
  declarations: [
    EmailComponent,
    InputComponent,
    SelectComponent,
    PasswordComponent
  ],
  exports: [
    EmailComponent,
    InputComponent,
    SelectComponent,
    PasswordComponent
  ]
})
export class UiModule {
}
