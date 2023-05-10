import { TestBed } from '@angular/core/testing';

import { DataSourceService } from './data-source.service';

type TestData = {name: string};

describe('DataGridService', () => {
  let service: DataSourceService<TestData>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
