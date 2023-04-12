import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { reactiveFormsFeatureShellRoutes } from './lib.routes';
import { OverviewComponent } from './overview/overview.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(reactiveFormsFeatureShellRoutes),
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class ReactiveFormsFeatureShellModule {}
