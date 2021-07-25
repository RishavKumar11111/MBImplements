import { TestBed } from '@angular/core/testing';

import { AaeService } from './aae.service';

describe('AaeService', () => {
  let service: AaeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(AaeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});