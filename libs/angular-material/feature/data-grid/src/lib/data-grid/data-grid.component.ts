import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'local-angular-material-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent<T extends Record<string, any>> {

  @Input() dataSource?: T[];

  @Output() filtered = new EventEmitter<T[]>();
}
