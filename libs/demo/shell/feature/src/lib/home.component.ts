import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'local-shell-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  mainNav: Array<{ url: string, caption: string }> = [];

  constructor(
    private readonly router: Router
  ) {
    this.mainNav = this.router.config
      .filter(conf => conf.path)
      .map(conf => ({url: conf.path as string, caption: conf.title as string}));
  }
}
