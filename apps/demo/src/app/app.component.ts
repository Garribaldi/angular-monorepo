import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import moment from "moment";

@Component({
  selector: "local-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {



  private title = "Local demo app";

  constructor(
    private readonly titleService: Title,
  ) {
    titleService.setTitle(this.title);
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
