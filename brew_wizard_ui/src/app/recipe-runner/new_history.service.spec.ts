import { TestBed } from '@angular/core/testing';

import { NewHistoryService } from './new_history.service';

describe('NewHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewHistoryService = TestBed.get(NewHistoryService);
    expect(service).toBeTruthy();
  });
});
