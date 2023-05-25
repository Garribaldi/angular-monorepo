import { Injectable } from '@angular/core';
import { Environment, GoogleCaptcha } from "./environment.model";
import { environment } from "./stages/environment";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentsService implements Environment {

  get production(): boolean {
    return environment.production;
  }

  get googleCaptcha(): GoogleCaptcha {
    return {...environment.googleCaptcha};
  }
}
