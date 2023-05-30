import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EnvironmentsService } from "@local/shared/feature/environments";
import { EvaluateGoogleCaptchaRequestBody } from "./evaluate-google-captcha-request-body.model";

@Injectable({
  providedIn: 'root'
})
export class EvaluateGoogleCaptchaService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environmentService: EnvironmentsService
  ) {
  }

  validateResponse$(token: string, siteKey: string): Observable<void> {
    const {projectId} = this.environmentService.googleCaptcha;
    const body: EvaluateGoogleCaptchaRequestBody = {
      token,
      siteKey,
      projectId
    };
    const url = `${this.environmentService.backendUrl}/google-evaluate`;

    return this.httpClient.post<void>(url, body);
  }
}
