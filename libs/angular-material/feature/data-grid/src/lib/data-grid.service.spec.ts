import { TestBed } from '@angular/core/testing';

import { DataGridService } from './data-grid.service';

type TestData = {name: string};

describe('DataGridService', () => {
  let service: DataGridService<TestData>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
