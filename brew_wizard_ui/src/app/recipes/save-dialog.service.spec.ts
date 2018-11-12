import { TestBed, inject } from '@angular/core/testing';

import { SaveDialogService } from './save-dialog.service';

describe('SaveDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveDialogService]
    });
  });

  it('should be created', inject([SaveDialogService], (service: SaveDialogService) => {
    expect(service).toBeTruthy();
  }));
});
