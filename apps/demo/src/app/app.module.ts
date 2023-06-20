import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { ShellModule } from "@local/demo/shell/feature";
import { environment } from "../environments/environment";


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    ShellModule.forRoot(environment)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
