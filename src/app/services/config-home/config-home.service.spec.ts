import { TestBed } from '@angular/core/testing';

import { ConfigHomeService } from './config-home.service';

describe('ConfigHomeService', () => {
  let service: ConfigHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
