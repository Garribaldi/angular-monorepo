import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubnavComponent } from './subnav.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  declarations: [
    SubnavComponent
  ],
  exports: [
    SubnavComponent
  ]
})
export class SharedSubnavModule {}
