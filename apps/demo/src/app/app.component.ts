import { Component, OnInit } from "@angular/core";
import { EnvironmentsService } from "@local/shared/feature/environments";
import { Title } from "@angular/platform-browser";
import moment from "moment";
import { Router } from "@angular/router";

@Component({
  selector: "local-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit{

  mainNav:Array<{url: string, caption: string}> = []

  backendUrl: string;
  integrationUrl: string;

  private title = "Local demo app";

  constructor(
    private readonly environmentService: EnvironmentsService,
    private readonly titleService: Title,
    private readonly router: Router
  ) {
    titleService.setTitle(this.title);

    this.mainNav = this.router.config
      .filter(conf => conf.path)
      .map(conf => ({url: conf.path as string, caption: conf.title as string}));

    this.backendUrl = environmentService.apiBackendUrl ?? '';
    this.integrationUrl = environmentService.externalIntegrationUrl ?? '';
  }

  /**
   * __Moment__ DE Settings
   *
   *  - LT: 'HH:mm',
   *  - LTS: 'HH:mm:ss',
   *  - L: 'DD.MM.YYYY',
   *  - LL: 'D. MMMM YYYY',
   *  - LLL: 'L LT',
   *  - LLLL: 'dddd, D. MMMM YYYY HH:mm'
   */
  ngOnInit() {
    moment.locale('de');
  }
}
