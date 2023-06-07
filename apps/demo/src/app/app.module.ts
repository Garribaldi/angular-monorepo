import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { ShellFeatureModule } from "@local/demo/shell/feature";
import { environment } from "../environments/environment";


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    ShellFeatureModule.forRoot(environment)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
