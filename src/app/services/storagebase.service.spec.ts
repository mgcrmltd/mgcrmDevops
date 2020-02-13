import { TestBed } from '@angular/core/testing';

import { StoragebaseService } from './storagebase.service';

describe('StoragebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoragebaseService = TestBed.get(StoragebaseService);
    expect(service).toBeTruthy();
  });
});
