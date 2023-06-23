import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from "@angular/forms";
import { validatePasswordStrength } from "@local/shared/utils";

/**
 * You only need to provide a form control with a string value for storing the password.
 *
 * The _Label_ for this field can be overwritten by content projection. Default is _Password_.
 *
 * Validators are added automatically by this component.
 *
 * Password strength validation and min length are always set.
 *
 * You can overwrite the min length via Input __minLength__. A value less than _8_ is ignored!
 *
 * You can overwrite mandatory via Input __required__. Required is set to _true_ as default.
 *
 * @example
 *  // minLength, required and 'Custom Password' password label are optional
 * <local-forms-password-field
 *    [formControl]="testForm.controls['password']"
 *    [minLength]="10"
 *    [required]="true"
 * >Custom Password</local-forms-password-field>
 * */
@Component({
  selector: 'local-forms-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent implements ControlValueAccessor, OnInit {

  private readonly pwMinLength = 8;

  @Input() minLength = this.pwMinLength;
  @Input() required = true;

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    const validators = [Validators.minLength(Math.max(this.minLength, this.pwMinLength)), validatePasswordStrength()];

    if (this.required) {
      validators.push(Validators.required);
    }

    this.ngControl.control?.addValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }

  // ControlValueAccessor interface
  /* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
  writeValue(obj: any) {
  }

  registerOnChange(fn: any) {
  }

  registerOnTouched(fn: any) {
  }


  setDisabledState(isDisabled: boolean) {
  }

  /* eslint-enable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
}
