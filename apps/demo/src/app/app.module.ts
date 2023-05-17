import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
  MatTooltipDefaultOptions
} from "@angular/material/tooltip";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpCacheInterceptor } from "@local/shared/utils";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useFactory: (): MatTooltipDefaultOptions => ({
        ...MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY(),
        disableTooltipInteractivity: true
      })
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
