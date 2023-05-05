import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataGridService } from "../data-grid.service";

@Component({
  selector: 'local-angular-material-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent<T extends Record<string, any>> implements OnInit{

  @Input() dataSource?: T[];

  @Output() filtered = new EventEmitter<T[]>();

  constructor(
     private readonly dataGridService: DataGridService<T>
  ) {
  }

  ngOnInit() {
    this.dataGridService.setDataSource(this.dataSource ?? []);
  }
}
