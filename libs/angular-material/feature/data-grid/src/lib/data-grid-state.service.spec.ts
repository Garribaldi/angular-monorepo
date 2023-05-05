import { TestBed } from '@angular/core/testing';

import { DataGridStateService } from './data-grid-state.service';

describe('DataGridStateService', () => {
  let service: DataGridStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGridStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
