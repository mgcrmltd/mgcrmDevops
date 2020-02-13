import { TestBed } from '@angular/core/testing';

import { HoursStorageService } from './hours-storage.service';

describe('HoursStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HoursStorageService = TestBed.get(HoursStorageService);
    expect(service).toBeTruthy();
  });
});
