import { importProvidersFrom, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Environment, ENVIRONMENT } from '@local/shared/feature/environments';
import { HttpCacheInterceptor } from '@local/shared/utils';
import { AppTitleStrategy } from '@local/demo/shell/utils';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TitleStrategy } from '@angular/router';

@NgModule({
  declarations: [
    ShellComponent
  ],
  exports: [
    ShellComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ShellRoutingModule,
    BrowserAnimationsModule,
    MatMomentDateModule
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
      provide: MAT_DATE_LOCALE,
      useValue: 'de-DE'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCacheInterceptor,
      multi: true
    },
    {
      provide: TitleStrategy,
      useClass: AppTitleStrategy
    },
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'de'
    }))
  ]
})
export class ShellModule {
  static forRoot(env: Environment): ModuleWithProviders<ShellModule> {
    return {
      ngModule: ShellModule,
      providers: [
        {provide: ENVIRONMENT, useValue: env}
      ]
    };
  }
}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
