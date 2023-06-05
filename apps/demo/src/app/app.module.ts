import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ShellFeatureModule } from "@local/shell/feature";
import { CommonModule } from "@angular/common";


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
