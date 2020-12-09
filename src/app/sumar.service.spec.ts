import { TestBed } from '@angular/core/testing';

import { SumarService } from './sumar.service';

describe('SumarService', () => {
  let service: SumarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SumarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
