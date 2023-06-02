import { Component } from '@angular/core';
import { ActivatedRoute, Route } from "@angular/router";

@Component({
  selector: 'local-demo-angular-material',
  templateUrl: './demo-angular-material.component.html',
  styleUrls: ['./demo-angular-material.component.scss'],
})
export class DemoAngularMaterialComponent {

  routerLinks: Route[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
    const childRoutes = activatedRoute?.routeConfig?.children ?? []
    this.routerLinks = childRoutes.filter(route => !!route.title);
  }


  // routerLinks: OverviewRouterModel[] = [
  //   {url: 'table', caption: 'Table'},
  //   {url: 'generic-table', caption: 'Generic Table'},
  //   {url: 'slider', caption: 'Slider'},
  //   {url: 'dialog', caption: 'Dialog'},
  //   {url: 'filter', caption: 'Filter'},
  //   {url: 'data-grid', caption: 'Data Grid'}
  // ];
}
