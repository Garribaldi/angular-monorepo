import { AfterViewInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit{
  @Input() data!: any;
  @ContentChild('headers') headers!: TemplateRef<any>;
  @ContentChild('rows') rows!: TemplateRef<any>;

  ngAfterViewInit() {
    console.log(this.data);
  }
}
