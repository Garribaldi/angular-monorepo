import { InjectionToken } from "@angular/core";
import { AppGoogleConfig } from "./configs/app.google.config";

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
  version: number;
  google: AppGoogleConfig;
}
