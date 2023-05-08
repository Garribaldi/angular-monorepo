import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataGridService } from "../data-grid.service";
import { DataGridStateService } from "../data-grid-state.service";

@Component({
  selector: 'local-angular-material-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent<T extends Record<string, any>> implements OnInit{

  @Input() dataSource?: T[];

  @Output() filtered = new EventEmitter<T[]>();

  constructor(
     private readonly dataGridService: DataGridService<T>,
     private readonly dateGridStateService: DataGridStateService
  ) {
  }

  ngOnInit() {
    this.dataGridService.setDataSource(this.dataSource ?? []);

    this.dateGridStateService.selectedFilter$
      .subscribe(filters => {
        this.dataGridService.filter(filters);
        this.filtered.next(this.dataGridService.filteredData);
      });
  }
}
