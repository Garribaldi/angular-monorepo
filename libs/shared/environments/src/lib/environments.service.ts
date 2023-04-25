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

  get apiBackendUrl(): string | undefined {
    return environment.apiBackendUrl;
  }

  get externalIntegrationUrl(): string | undefined {
    return environment.externalIntegrationUrl;
  }
}
