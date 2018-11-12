import { TestBed, inject } from '@angular/core/testing';

import { AcidService } from './acid.service';

describe('AcidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcidService]
    });
  });

  it('should be created', inject([AcidService], (service: AcidService) => {
    expect(service).toBeTruthy();
  }));
});
