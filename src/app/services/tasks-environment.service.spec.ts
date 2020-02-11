import { TestBed } from '@angular/core/testing';

import { TasksEnvironmentService } from './tasks-environment.service';

describe('TasksEnvironmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksEnvironmentService = TestBed.get(TasksEnvironmentService);
    expect(service).toBeTruthy();
  });
});
