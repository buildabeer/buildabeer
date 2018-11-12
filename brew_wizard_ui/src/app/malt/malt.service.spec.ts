import { TestBed, inject } from '@angular/core/testing';

import { MaltService } from './malt.service';

describe('MaltService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaltService]
    });
  });

  it('should be created', inject([MaltService], (service: MaltService) => {
    expect(service).toBeTruthy();
  }));
});
