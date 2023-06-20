import { TestBed } from '@angular/core/testing';
import { SharedDataService } from './shared-data.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockProvider } from "ng-mocks";
import { EnvironmentsService } from "@local/shared/feature/environments";

describe('SharedDataService', () => {
  let service: SharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MockProvider(EnvironmentsService)
      ]
    });
    service = TestBed.inject(SharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
