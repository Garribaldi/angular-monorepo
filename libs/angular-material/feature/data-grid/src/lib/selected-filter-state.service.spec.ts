import { TestBed } from '@angular/core/testing';

import { SelectedFilterStateService } from './selected-filter-state.service';

describe('DataGridStateService', () => {
  let service: SelectedFilterStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedFilterStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
