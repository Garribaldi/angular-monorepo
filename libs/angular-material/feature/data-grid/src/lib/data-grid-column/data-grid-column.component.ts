import { Component, Input } from '@angular/core';
import { FilterType } from "../data-grid.model";

@Component({
  selector: 'local-angular-material-data-grid-column',
  templateUrl: './data-grid-column.component.html',
  styleUrls: ['./data-grid-column.component.scss'],
})
export class DataGridColumnComponent {

  @Input() column?: string;
  @Input() filterType?: FilterType;
}
