import { TestBed } from '@angular/core/testing';

import { GoogleValidateService } from './google-validate.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockProvider } from "ng-mocks";
import { EnvironmentsService } from "@local/shared/feature/environments";

describe('GoogleValidateService', () => {
  let service: GoogleValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MockProvider(EnvironmentsService, {
          googleCaptcha: {
            restApi: '',
            projectId: '',
            apiKey: '',
            captchaV2Key: '',
            captchaV3Key: ''
          }
        })
      ]
    });
    service = TestBed.inject(GoogleValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
