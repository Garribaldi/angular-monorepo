import { TestBed } from '@angular/core/testing';

import { DialogFormService } from './dialog-form.service';

describe('FormService', () => {
  let service: DialogFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
