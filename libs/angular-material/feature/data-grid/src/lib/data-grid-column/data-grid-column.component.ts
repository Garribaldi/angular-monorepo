import { Component, Input, OnInit } from '@angular/core';
import { Filter, FilterType } from "../data-grid.model";
import { DataGridService } from "../data-grid.service";

@Component({
  selector: 'local-angular-material-data-grid-column',
  templateUrl: './data-grid-column.component.html',
  styleUrls: ['./data-grid-column.component.scss'],
})
export class DataGridColumnComponent<T extends Record<string, any>> implements OnInit {

  @Input() column!: string;
  @Input() type!: FilterType;
  @Input() label!: string;

  filterType = FilterType;

  filters: Filter[] = [];

  constructor(
    private readonly dataGridService: DataGridService<T>
  ) {
  }

  ngOnInit() {
    this.filters = this.dataGridService.getFiltersForColumn(this.column, this.type);
  }
}
