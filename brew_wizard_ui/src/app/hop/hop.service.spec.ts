import { TestBed, inject } from '@angular/core/testing';

import { HopService } from './hop.service';

describe('HopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HopService]
    });
  });

  it('should be created', inject([HopService], (service: HopService) => {
    expect(service).toBeTruthy();
  }));
});
