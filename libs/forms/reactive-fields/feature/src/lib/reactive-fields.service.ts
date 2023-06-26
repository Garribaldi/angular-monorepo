import { Injectable } from '@angular/core';
import { NgControl, ValidatorFn, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ReactiveFieldsService {

  /**
   * Setup Validation for custom form field.
   *
   * @param ngControl FormControl to add validators to
   * @param required if custom field is required, set to true
   * @param validators a list of predefined validators
   */
  initValidators(ngControl: NgControl, required?: boolean,  validators: ValidatorFn[] = []) {

    if (required) {
      validators.push(Validators.required);
    }

    ngControl.control?.addValidators(validators);
    ngControl.control?.updateValueAndValidity();
  }
}
