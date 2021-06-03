import { TestBed } from '@angular/core/testing';

import { EeService } from './ee.service';

describe('EeService', () => {
  let service: EeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(EeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});