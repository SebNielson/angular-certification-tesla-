import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { stepThreeGuard } from './step-three.guard';

describe('stepThreeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => stepThreeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
