import { TestBed } from '@angular/core/testing';

import { OaicService } from './oaic.service';

describe('OaicService', () => {
  let service: OaicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(OaicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});