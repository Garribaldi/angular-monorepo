import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { TableHeaderTemplateDirective } from "./table-header-template.directive";
import { TableRowTemplateDirective } from "./table-row-template.directive";

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<TItem extends object> {
  @Input() data!: TItem[] | null;

  @ContentChild(TableHeaderTemplateDirective, {read: TemplateRef}) headers?: TemplateRef<TItem[]>;

  @ContentChild(TableRowTemplateDirective, {read: TemplateRef}) rows?: TemplateRef<TItem>;
}
 
