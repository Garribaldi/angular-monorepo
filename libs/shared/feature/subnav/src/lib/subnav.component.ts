import { Component } from '@angular/core';
import { ActivatedRoute, Route } from "@angular/router";

/**
 * Display a second navigation withing the page content and route to the defined child routes.
 * Only routes from the children array with a defined title property will be used. Example:
 *
 *  { path: '', pathMatch: 'prefix', component: DemoComponent,
 *
 *    children: [
 *
 *       { path: '', pathMatch: "full", redirectTo: 'demo-path' },
 *
 *       { path: 'demo-path', title: 'Formly', component: DemoChildComponent }
 *
 *     ]
 *   }
 */
@Component({
  selector: 'local-shared-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss'],
})
export class SubnavComponent {

  routerLinks: Route[] = [];
  
  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
    const childRoutes = this.activatedRoute?.routeConfig?.children ?? []
    this.routerLinks = childRoutes.filter(route => !!route.title);
  }
}
