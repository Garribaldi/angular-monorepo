import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './ui/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogShellComponent } from './ui/dialog-shell/dialog-shell.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [
    DialogComponent,
    DialogShellComponent
  ],
  exports: [
    DialogComponent,
    DialogShellComponent
  ],
})
export class AngularMaterialFeatureDialogModule {
}
