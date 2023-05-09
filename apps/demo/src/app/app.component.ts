import { Component, OnInit } from "@angular/core";
import { EnvironmentsService } from "@local/shared/environments";
import { Title } from "@angular/platform-browser";
import moment from "moment";

@Component({
  selector: "local-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit{

  backendUrl: string;
  integrationUrl: string;

  private title = "Local demo app";

  constructor(
    private readonly environmentService: EnvironmentsService,
    private readonly titleService: Title
  ) {
    titleService.setTitle(this.title);

    this.backendUrl = environmentService.apiBackendUrl ?? '';
    this.integrationUrl = environmentService.externalIntegrationUrl ?? '';
  }

  ngOnInit() {
    // moment.updateLocale('de', {
    //   LT: 'HH:mm',
    //   LTS: 'HH:mm:ss',
    //   L: 'DD.MM.YYYY',
    //   LL: 'D. MMMM YYYY',
    //   LLL: 'L LT',
    //   LLLL: 'dddd, D. MMMM YYYY HH:mm'
    // });
    moment.locale('de');
  }
}
