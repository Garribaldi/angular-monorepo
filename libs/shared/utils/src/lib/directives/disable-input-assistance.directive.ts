import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[matInput], ngx-mat-select-search'
})
export class DisableInputAssistanceDirective implements AfterViewInit{

  constructor(private elementRef: ElementRef<HTMLInputElement>) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.setAttribute('spellcheck', 'false');
    this.elementRef.nativeElement.setAttribute('autocomplete', 'off');
  }
}
