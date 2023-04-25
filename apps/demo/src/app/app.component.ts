import { Component } from "@angular/core";
import { EnvironmentsService } from "@local/shared/environments";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "local-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  backendUrl: string;

  private title = "Local demo app";

  constructor(
    private readonly environmentService: EnvironmentsService,
    private readonly titleService: Title
  ) {
    titleService.setTitle(this.title);

    this.backendUrl = environmentService.apiBackendUrl ?? '';
  }
}
