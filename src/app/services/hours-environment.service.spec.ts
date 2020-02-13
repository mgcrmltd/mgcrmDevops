import { TestBed } from '@angular/core/testing';

import { HoursEnvironmentService } from './hours-environment.service';

describe('HoursEnvironmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HoursEnvironmentService = TestBed.get(HoursEnvironmentService);
    expect(service).toBeTruthy();
  });
});
