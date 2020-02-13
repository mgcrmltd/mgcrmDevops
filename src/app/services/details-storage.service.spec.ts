import { TestBed } from '@angular/core/testing';

import { DetailsStorageService } from './details-storage.service';

describe('DetailsStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailsStorageService = TestBed.get(DetailsStorageService);
    expect(service).toBeTruthy();
  });
});
