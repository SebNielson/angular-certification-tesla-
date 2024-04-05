import { TestBed } from '@angular/core/testing';

import { TeslaConfigurationService } from './tesla-configuration.service';

describe('TeslaConfigurationService', () => {
  let service: TeslaConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeslaConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
