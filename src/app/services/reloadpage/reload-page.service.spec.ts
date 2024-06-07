import { TestBed } from '@angular/core/testing';

import { ReloadPageService } from './reload-page.service';

describe('ReloadPageService', () => {
  let service: ReloadPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReloadPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
