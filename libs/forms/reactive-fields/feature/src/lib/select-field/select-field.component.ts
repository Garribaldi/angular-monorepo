import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { SelectOptions } from "./select-option.model";
import { ReactiveFieldsService } from "../reactive-fields.service";

/**
 * You only need to provide a form control with a string value for storing the text.
 *
 * The _Label_ for this field can be overwritten by content projection. Default is _Select_.
 *
 * You have to provide select options as an array of type __SelectOption__.
 *
 * You can overwrite mandatory via Input __required__. Required is set to _true_ as default.
 * You can overwrite the error message __requiredErrorMessage__. Default is _'Field is required. Please choose a value.'_.
 *
 * @example
 *  // required, requiredErrorMessage and 'Custom select' label are optional
 * <local-forms-select-field
 *    [formControl]="testForm.controls['select']"
 *    [selectOptions]="selectOptions"
 *    [required]="true"
 *    [requiredErrorMessage]="Select is required, please choose a value."
 * >Custom select</local-forms-select-field>
 * */
@Component({
  selector: 'local-forms-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
})
export class SelectFieldComponent implements ControlValueAccessor, OnInit {

  @Input() selectOptions: SelectOptions[] = [];
  @Input() required = true;
  @Input() requiredErrorMessage = 'Field is required. Please choose a value.';

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private readonly reactiveFieldsService: ReactiveFieldsService
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.reactiveFieldsService.initValidators(this.ngControl, this.required);
  }

  // ControlValueAccessor interface
  /* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

  writeValue(value: any) {
  }

  registerOnChange(fn: any) {
  }

  registerOnTouched(fn: any) {
  }


  setDisabledState(isDisabled: boolean) {
  }

  /* eslint-enable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
}
