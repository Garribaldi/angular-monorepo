import { TestBed } from '@angular/core/testing';

import { ChartsHelperService } from './charts-helper.service';

describe('ChartsHelperService', () => {
  let service: ChartsHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
