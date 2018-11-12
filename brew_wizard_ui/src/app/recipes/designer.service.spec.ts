import { TestBed, inject } from '@angular/core/testing';

import { DesignerService } from './designer.service';

describe('DesignerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesignerService]
    });
  });

  it('should be created', inject([DesignerService], (service: DesignerService) => {
    expect(service).toBeTruthy();
  }));
});
