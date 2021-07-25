import { TestBed } from '@angular/core/testing';

import { AeeService } from './aee.service';

describe('AeeService', () => {
  let service: AeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(AeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});