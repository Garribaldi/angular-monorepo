import { Directive, HostBinding, Input, OnInit } from '@angular/core';

/**
 * Adds a data attribute for cypress e2e test to the host element.
 *
 * Cypress tests can select HTML-Elements by this __data-cy__ attribute-selector.
 *
 * Provide a unique string to identify your Element.
 */
@Directive({
  selector: '[cyGet]'
})
export class CypressSelectorDirective implements OnInit{

  @HostBinding('attr.data-cy') cypressSelector = '';

  @Input() cyGet!: string;

  ngOnInit() {
    this.cypressSelector = this.cyGet;
  }
}
