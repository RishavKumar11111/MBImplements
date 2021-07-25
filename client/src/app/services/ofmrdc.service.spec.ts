import { TestBed } from '@angular/core/testing';

import { OfmrdcService } from './ofmrdc.service';

describe('OfmrdcService', () => {
  let service: OfmrdcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(OfmrdcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});