import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { CommonModule } from "@angular/common";
import { ShellFeatureModule } from "@local/demo/shell/feature";


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    ShellFeatureModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
