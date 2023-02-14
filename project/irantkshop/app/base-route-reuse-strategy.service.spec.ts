import { TestBed } from '@angular/core/testing';

import { BaseRouteReuseStrategyService } from './base-route-reuse-strategy.service';

describe('BaseRouteReuseStrategyService', () => {
  let service: BaseRouteReuseStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseRouteReuseStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
