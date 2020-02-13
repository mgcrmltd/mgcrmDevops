import { Injectable } from '@angular/core';
import { DevopsTaskList } from '../generate-tasks/tasks';
import { TasksEnvironmentService } from './tasks-environment.service';
import { TasksStorageService } from './tasks-storage.service';
import { DevopsDetailsServiceStrategyBase } from './devopsdetails';

@Injectable({
  providedIn: 'root'
})

export class TasksService  extends DevopsDetailsServiceStrategyBase<DevopsTaskList>{

  constructor(private taskEnvService: TasksEnvironmentService,
    private taskStorageService: TasksStorageService) {
    super(taskStorageService, taskEnvService);
  }

}
