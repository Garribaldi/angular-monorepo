import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "../../data-access/dialog-data.model";
import { FormGroup } from "@angular/forms";
import { FormService } from "../../utils/form.service";

@Component({
  selector: 'angular-material-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  categories: string[];
  dialogData: DialogData;
  form: FormGroup;

  constructor(
    private readonly formService: FormService,
    public readonly dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: DialogData
  ) {
    this.dialogData = {...data};
    this.form = formService.buildForm;
    this.categories = formService.categories;
  }

  ngOnInit() {
    this.form.patchValue(this.dialogData);
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }
}
