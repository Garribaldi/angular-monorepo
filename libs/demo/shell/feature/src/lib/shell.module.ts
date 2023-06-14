import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';
import { ShellRoutingModule } from './shell-routing.module';
import { HomeComponent } from './home.component';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { Environment, ENVIRONMENT } from "@local/shared/feature/environments";
import { HttpCacheInterceptor } from "@local/shared/utils";
import { TitleStrategy } from "@angular/router";
import { DemoTitleStrategy } from "./demo-title-strategy";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ShellRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMomentDateModule
  ],
  providers: [
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useFactory: (): MatTooltipDefaultOptions => ({
        ...MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY(),
        disableTooltipInteractivity: true,
      }),
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-DE',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCacheInterceptor,
      multi: true,
    },
    {
      provide: TitleStrategy,
      useClass: DemoTitleStrategy
    }
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class ShellModule {
  static forRoot(env: Environment): ModuleWithProviders<ShellModule> {
    return  {
      ngModule: ShellModule,
      providers: [
        {provide: ENVIRONMENT, useValue: env}
      ]
    }
  }
}
