import { Directive, Input } from '@angular/core';

interface TableHeaderTemplateContext<TItem extends object> {
  $implicit: TItem[];
}
@Directive({
  selector: 'ng-template[appTableHeader]'
})
export class TableHeaderTemplateDirective<TItem extends object> {
  @Input('appTableHeader') data!: TItem[] | '';

  static ngTemplateContextGuard<TContextItem extends object>(
    directive: TableHeaderTemplateDirective<TContextItem>,
    context: unknown,
  ): context is TableHeaderTemplateContext<TContextItem> {
    return true;
  }
}
