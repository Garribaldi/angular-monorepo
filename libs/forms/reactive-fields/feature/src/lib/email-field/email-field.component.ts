import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from "@angular/forms";
import { ReactiveFieldsService } from "../reactive-fields.service";

/**
 * You only need to provide a form control with a string value for storing the email.
 *
 * The _Label_ for this field can be overwritten by content projection. Default is _eMail_.
 *
 * Validators are added automatically by this component.
 *
 * eMail validation is always set.
 *
 * You can overwrite mandatory via Input __required__. Required is set to _true_ as default.
 *
 * @example
 *  // required and 'Custom eMail' label are optional
 * <local-forms-email-field
 *    [formControl]="testForm.controls['email']"
 *    [required]="true"
 * >Custom eMail</local-forms-email-field>
 * */
@Component({
  selector: 'local-forms-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss'],
})
export class EmailFieldComponent implements ControlValueAccessor, OnInit {

  @Input() required = true;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private readonly reactiveFieldsService: ReactiveFieldsService
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.reactiveFieldsService.initValidators(this.ngControl, this.required, [Validators.email]);
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
