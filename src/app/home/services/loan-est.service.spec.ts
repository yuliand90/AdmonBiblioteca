import { TestBed } from '@angular/core/testing';

import { LoanEstService } from './loan-est.service';

describe('LoanEstService', () => {
  let service: LoanEstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanEstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
