import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "../../../../dialog/src/lib/dialog-data.model";
import { take } from "rxjs";
import { DialogComponent } from "../../../../dialog/src/lib/dialog/dialog.component";
import { FormGroup } from "@angular/forms";
import { DialogFormService } from "../../../../dialog/src/lib/dialog-form.service";

@Component({
  selector: 'local-angular-material-dialog-shell',
  templateUrl: './dialog-shell.component.html',
  styleUrls: ['./dialog-shell.component.scss'],
})
export class DialogShellComponent implements OnInit {

  @ViewChild('secondDialog', {static: true}) secondDialog!: TemplateRef<never>;

  courseData?: DialogData;
  form: FormGroup;
  categories: string[];

  private readonly dialogConfig: MatDialogConfig;
  private dialogRef?: MatDialogRef<DialogComponent | TemplateRef<never>>;

  constructor(
    public dialog: MatDialog,
    private readonly formService: DialogFormService
  ) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;

    this.form = formService.form;
    this.categories = formService.categories;
  }

  ngOnInit() {
    this.courseData = {description: 'Awesome course', category: '', date: null};
  }

  openDialog(): void {
    this.dialogConfig.data = this.courseData;
    this.dialogRef = this.dialog.open(DialogComponent, this.dialogConfig);
    this.onDialogClose();
  }

  openTemplateDialog() {
    this.form.patchValue(this.courseData ?? {});
    this.dialogRef = this.dialog.open(this.secondDialog, this.dialogConfig);
    this.onDialogClose();
  }

  private onDialogClose(): void {
    this.dialogRef?.afterClosed()
      .pipe(take(1))
      .subscribe((result: DialogData) => {
        if (result) {
          this.courseData = result;
        }
      });
  }
}