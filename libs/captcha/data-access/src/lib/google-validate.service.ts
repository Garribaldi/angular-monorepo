import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { EnvironmentsService } from "@local/shared/feature/environments";
import {
  GoogleEvaluateCaptchaRequestBody,
  GoogleEvaluateCaptchaResponse,
  GoogleEvaluateCaptchaResponseDto
} from "./google-api.model";

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

    return this.httpClient.post<GoogleEvaluateCaptchaResponseDto>(this.googleApi, eventBody).pipe(
      map(response => this.mapToEvaluationResponse(response))
    );
  }

  private mapToEvaluationResponse(responseDto: GoogleEvaluateCaptchaResponseDto): GoogleEvaluateCaptchaResponse {
    return {
      name: responseDto.name,
      valid: responseDto.tokenProperties.valid,
      score: responseDto.riskAnalysis.score,
      siteKey: responseDto.event.siteKey,
      token: responseDto.event.token,
      createTime: new Date(responseDto.tokenProperties.createTime),
      invalidReason: responseDto.tokenProperties.invalidReason
    }
  }
}
