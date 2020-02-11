import { Injectable } from '@angular/core';
import { IDevopsDetailsService } from '../details/details';
import { DevopsTaskList } from '../generate-tasks/tasks';
import { TasksEnvironmentService } from './tasks-environment.service';
import { TasksStorageService } from './tasks-storage.service';

@Injectable({
  providedIn: 'root'
})

//todo: this is almost identical to the details service. genericise.
export class TasksService implements IDevopsDetailsService<DevopsTaskList>{

  constructor(private taskEnvService: TasksEnvironmentService,
    private taskStorageService: TasksStorageService) { }

  async getDevopsDetails(): Promise<DevopsTaskList> {
    if(await this.taskStorageService.detailsAvailable()){
      return await this.taskStorageService.getDevopsDetails();
    }
    else if(await this.taskEnvService.detailsAvailable()){
      return await this.taskEnvService.getDevopsDetails();
    }
    return null;
  }
  async detailsAvailable(): Promise<boolean> {
    let avail =  await this.taskStorageService.detailsAvailable();
    if(avail) return true;
    return await this.taskEnvService.detailsAvailable();
  }
  save(details: DevopsTaskList) {
    this.taskStorageService.save(details);
  }

}
