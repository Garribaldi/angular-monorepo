import { Component, Input, OnInit } from '@angular/core';
import { Filter, FilterType, FilterValue } from "../data-grid.model";
import { v4 as uuidv4 } from "uuid";
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

  private readonly filter: Filter = {
    id: uuidv4(),
    type: FilterType.UNKNOWN_FILTER,
    value: '',
    displayValue: '',
    hitCount: 0
  };

  columnData: FilterValue[] = [];

  constructor(
    private readonly dataGridService: DataGridService<T>
  ) {
  }

  ngOnInit() {
    this.filter.type = this.type;
    this.filter.displayValue = this.label;
    this.columnData = this.dataGridService.getColumnData(this.column);
  }
}
