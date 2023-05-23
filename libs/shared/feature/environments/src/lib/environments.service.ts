import { Injectable } from '@angular/core';
import { Environment } from "./environments.model";
import { environment } from "./stages/environment";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentsService implements Environment {

  get production(): boolean {
    return environment.production;
  }

  get apiBackendUrl(): string {
    return environment.apiBackendUrl;
  }

  get externalIntegrationUrl(): string {
    return environment.externalIntegrationUrl;
  }

  get captchaV2Key(): string {
   return environment.captchaV2Key;
  }

  get captchaV3Key(): string {
    return environment.captchaV3Key;
  }
}
