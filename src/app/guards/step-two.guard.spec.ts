import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { stepTwoGuard } from './step-two.guard';

describe('stepTwoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => stepTwoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
