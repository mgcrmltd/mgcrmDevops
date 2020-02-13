import { TestBed } from '@angular/core/testing';

import { DetailsEnvironmentService } from './details-environment.service';

describe('DetailsEnvironmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailsEnvironmentService = TestBed.get(DetailsEnvironmentService);
    expect(service).toBeTruthy();
  });
});
