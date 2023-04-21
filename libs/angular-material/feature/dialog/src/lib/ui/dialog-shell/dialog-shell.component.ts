import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogData } from "../../data-access/dialog-data.model";
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

  private readonly dialogConfig: MatDialogConfig;

  constructor(public dialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
  }

  openDialog(): void {
    this.dialogConfig.data = {brand: this.carBrand, type: this.carType} as DialogData;

    const dialogRef = this.dialog.open(DialogComponent, this.dialogConfig);

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        console.log('Dialog closed');
        this.carType = result;
      });
  }
}
