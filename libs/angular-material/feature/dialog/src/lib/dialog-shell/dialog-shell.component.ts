import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DialogData } from "../dialog/dialog-data.model";
import { take } from "rxjs";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'angular-material-dialog-shell',
  templateUrl: './dialog-shell.component.html',
  styleUrls: ['./dialog-shell.component.scss'],
})
export class DialogShellComponent {

  carBrand = '';
  carType = '';

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const data: DialogData = {brand: this.carBrand, type: this.carType}

    const dialogRef = this.dialog.open(DialogComponent, {
      data
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        console.log('Dialog closed');
        this.carType = result;
      });
  }
}
