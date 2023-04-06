import { Directive, Input } from '@angular/core';

interface TableRowTemplateContext<TItem extends object> {
  $implicit: TItem;
}
@Directive({
  selector: 'ng-template[appTableRow]'
})
export class TableRowTemplateDirective<TItem extends object> {
  @Input('appTableRow') data!: TItem[] | null;

  static ngTemplateContextGuard<TContextItem extends object>(
    directive: TableRowTemplateDirective<TContextItem>,
    context: unknown,
  ): context is TableRowTemplateContext<TContextItem> {
    return true;
  }
}
