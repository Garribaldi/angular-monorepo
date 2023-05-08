import { Component, Input, OnInit } from '@angular/core';
import { Filter, FilterType } from "../data-grid.model";
import { DataGridService } from "../data-grid.service";
import { DataGridStateService } from "../data-grid-state.service";

@Component({
  selector: 'local-angular-material-data-grid-column',
  templateUrl: './data-grid-column.component.html',
  styleUrls: ['./data-grid-column.component.scss'],
})
export class DataGridColumnComponent<T extends Record<string, any>> implements OnInit {

  @Input() column!: string;
  @Input() type!: FilterType;
  @Input() label!: string;

  readonly filterType = FilterType;

  filters: Filter[] = [];

  constructor(
    private readonly dataGridService: DataGridService<T>,
    private readonly dataGridStateService: DataGridStateService
  ) {
  }

  ngOnInit() {
    this.filters = this.dataGridService.getFiltersForColumn(this.column, this.type, this.label);
  }

  resetColumn() {
    this.dataGridStateService.removeFiltersByColumn(this.column);
  }
}
