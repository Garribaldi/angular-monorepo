import { TestBed } from '@angular/core/testing';

import { EnvironmentsService } from './environments.service';
import { MockProvider } from "ng-mocks";
import { ENVIRONMENT } from "./environment.model";

describe('EnvironmentsService', () => {
  let service: EnvironmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(ENVIRONMENT)
      ]
    });
    service = TestBed.inject(EnvironmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
