import { Component } from '@angular/core';
import { ActivatedRoute, Route } from "@angular/router";

@Component({
  selector: 'local-angular-material-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  routerLinks: Route[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.routerLinks = activatedRoute.routeConfig?.children?.filter(config => !!config.title) ?? [];
  }
}
