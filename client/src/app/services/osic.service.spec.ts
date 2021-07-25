import { TestBed } from '@angular/core/testing';

import { OsicService } from './osic.service';

describe('OsicService', () => {
  let service: OsicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(OsicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});