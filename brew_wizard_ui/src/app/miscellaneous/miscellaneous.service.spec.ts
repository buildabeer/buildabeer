import { TestBed, inject } from '@angular/core/testing';

import { MiscellaneousService } from './miscellaneous.service';

describe('MiscellaneousService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiscellaneousService]
    });
  });

  it('should be created', inject([MiscellaneousService], (service: MiscellaneousService) => {
    expect(service).toBeTruthy();
  }));
});
