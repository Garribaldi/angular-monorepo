import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { GenericFormService } from '@local/forms/generic-form/utils';

/**
 * You only need to provide a form control with a string value for storing the text.
 *
 * The _Label_ for this field can be overwritten by content projection. Default is _Text_.
 *
 * You can overwrite mandatory via Input __required__. Required is set to _true_ as default.
 * You can overwrite the error message __requiredErrorMessage__. Default is _'Field is required. Please enter a value.'_.
 *
 * @example
 *  // required, requiredErrorMessage and 'Custom text' label are optional
 * <local-forms-text-field
 *    [formControl]="testForm.controls['text']"
 *    [required]="true"
 *    [requiredErrorMessage]="Text is required, please enter a value."
 * >Custom text</local-forms-text-field>
 * */
@Component({
  selector: 'forms-input-control',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements ControlValueAccessor, OnInit {

  @Input() required = true;
  @Input() requiredErrorMessage = 'Field is required. Please enter a value.';

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private readonly reactiveFieldsService: GenericFormService
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.reactiveFieldsService.initValidators(this.ngControl, this.required);
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
