import { TestBed, inject } from '@angular/core/testing';

import { YeastService } from './yeast.service';

describe('YeastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YeastService]
    });
  });

  it('should be created', inject([YeastService], (service: YeastService) => {
    expect(service).toBeTruthy();
  }));
});
