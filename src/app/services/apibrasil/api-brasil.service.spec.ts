import { TestBed } from '@angular/core/testing';

import { ApiBrasilService } from './api-brasil.service';

describe('ApiBrasilService', () => {
  let service: ApiBrasilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBrasilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
