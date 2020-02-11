import { TestBed } from '@angular/core/testing';

import { TasksStorageService } from './tasks-storage.service';

describe('TasksStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksStorageService = TestBed.get(TasksStorageService);
    expect(service).toBeTruthy();
  });
});
