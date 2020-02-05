import { TestBed } from '@angular/core/testing';

import { DevopsFactoryService } from './devops-factory.service';

describe('DevopsFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevopsFactoryService = TestBed.get(DevopsFactoryService);
    expect(service).toBeTruthy();
  });
});
