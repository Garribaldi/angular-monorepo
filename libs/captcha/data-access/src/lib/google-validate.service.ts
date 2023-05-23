import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EnvironmentsService } from "@local/shared/feature/environments";
import { GoogleEvaluateCaptchaRequestBody, GoogleEvaluateCaptchaResponse } from "./google-api.model";

@Injectable({
  providedIn: 'root'
})
export class GoogleValidateService {

  private readonly googleApi: string;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environmentService: EnvironmentsService
  ) {
    const {restApi, projectId, apiKey} = environmentService.googleCaptcha;
    this.googleApi = restApi.replace('PROJECT_ID', projectId).replace('API_KEY', apiKey);
  }

  validateResponse$(token: string, siteKey: string): Observable<GoogleEvaluateCaptchaResponse> {
    const eventBody: GoogleEvaluateCaptchaRequestBody = {
      event: {
        token,
        siteKey,
        expectedAction: ''
      }
    };

    return this.httpClient.post<GoogleEvaluateCaptchaResponse>(this.googleApi, eventBody);
  }
}
