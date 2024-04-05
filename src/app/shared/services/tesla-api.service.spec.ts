import { TestBed } from '@angular/core/testing';

import { TeslaApiService } from './tesla-api.service';

describe('TeslaApiService', () => {
  let service: TeslaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeslaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
