import { TestBed } from '@angular/core/testing';

import { CustomeRouteReuseStrategyService } from './custome-route-reuse-strategy.service';

describe('CustomeRouteReuseStrategyService', () => {
  let service: CustomeRouteReuseStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomeRouteReuseStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
