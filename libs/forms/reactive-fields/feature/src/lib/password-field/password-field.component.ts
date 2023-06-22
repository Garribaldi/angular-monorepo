import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from "@angular/forms";
import { validatePasswordStrength } from "@local/shared/utils";

/**
 * You only need to provide a form control with a string value for storing the password.
 * Validators are added automatically by this component.
 *
 * Password strength validation and min length are always set.
 * You can overwrite the length via Input __minLength__. _A value less than 8 is ignored!_
 *
 * Required is set to true as default. You can overwrite this via Input __required__.
 */
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
    @Self() public ngControl: NgControl
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
