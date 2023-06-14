import { Component, OnInit } from "@angular/core";
import moment from "moment";
import { DateAdapter } from "@angular/material/core";

@Component({
  selector: "local-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {

  private readonly momentLocale = 'de';
  private readonly materialLocal = 'de-DE';

  constructor(
    private readonly dateAdapter: DateAdapter<never>
  ) {
    this.dateAdapter.setLocale(this.materialLocal);
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
    moment.locale(this.momentLocale);
  }
}
