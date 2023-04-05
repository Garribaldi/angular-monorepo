import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() data!: any[];
  @ContentChild('headers') headers!: TemplateRef<any>;
  @ContentChild('rows') rows!: TemplateRef<any>;
}
