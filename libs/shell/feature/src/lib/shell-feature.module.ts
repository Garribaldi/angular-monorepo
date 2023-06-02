import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';
import { HttpCacheInterceptor } from '@local/shared/utils';
import { ShellFeatureRoutingModule } from './shell-feature-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ShellFeatureRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCacheInterceptor,
      multi: true,
    },
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class ShellFeatureModule {}
