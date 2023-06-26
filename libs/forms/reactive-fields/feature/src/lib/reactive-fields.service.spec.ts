import { TestBed } from '@angular/core/testing';

import { ReactiveFieldsService } from './reactive-fields.service';

describe('ReactiveFieldsService', () => {
  let service: ReactiveFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactiveFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
