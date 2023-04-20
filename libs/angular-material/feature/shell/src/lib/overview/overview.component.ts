import { Component } from '@angular/core';
import { OverviewRouterModel } from "./overview.router.model";

@Component({
  selector: 'angular-material-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  routerLinks: OverviewRouterModel[] = [
    {url: 'table', caption: 'Table'},
    {url: 'slider', caption: 'Slider'},
    {url: 'dialog', caption: 'Dialog'}
  ];
}
