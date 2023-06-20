import { Injectable } from "@angular/core";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Injectable()
export class DemoTitleStrategy extends TitleStrategy {

  constructor(
    private readonly title: Title
  ) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const routeTitle = this.buildTitle(routerState);
    const title = ('Local demo app').concat(routeTitle ? ` - ${routeTitle}` : '');
    this.title.setTitle(title);
  }
}
