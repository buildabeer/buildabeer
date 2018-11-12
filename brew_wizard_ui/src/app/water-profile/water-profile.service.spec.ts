import { TestBed, inject } from '@angular/core/testing';

import { WaterProfileService } from './water-profile.service';

describe('WaterProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaterProfileService]
    });
  });

  it('should be created', inject([WaterProfileService], (service: WaterProfileService) => {
    expect(service).toBeTruthy();
  }));
});
