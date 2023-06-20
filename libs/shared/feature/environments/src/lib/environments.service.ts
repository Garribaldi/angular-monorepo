import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT, Environment, GoogleCaptcha } from "./environment.model";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentsService implements Environment {

  constructor(@Inject(ENVIRONMENT) private readonly environment: Environment) {
  }

  get production(): boolean {
    return this.environment.production;
  }

  get backendUrl(): string {
    return this.environment.backendUrl;
  }

  get googleCaptcha(): GoogleCaptcha {
    return {...this.environment.googleCaptcha};
  }
}
