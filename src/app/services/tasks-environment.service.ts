import { Injectable } from '@angular/core';
import { DevopsTaskList, DevopsTask } from '../generate-tasks/tasks';
import { IDevopsDetailsService } from '../details/details';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class TasksEnvironmentService  implements IDevopsDetailsService<DevopsTaskList>  {
  
  async getDevopsDetails(): Promise<DevopsTaskList> {
    let taskList = new DevopsTaskList();
    let taskObj = environment.tasks;
    taskList.complex = taskObj.complex;
    taskList.taskTitles = new Array();
    taskObj.taskTitles.forEach(x=>{
      let tsk = new DevopsTask();
      tsk.name = x.name;
      taskList.taskTitles.push(tsk);
    });
    return taskList;
  }
  
  async detailsAvailable(): Promise<boolean> {
    var env = environment;
    if (this.isNullOrUndefined(env)) return false;
    if (this.isNullOrUndefined(env.tasks)) return false;
    return true;
  }
  save(details: DevopsTaskList) {
    throw new Error("Cannot save to environment.");
  }

  //Now have duplicate code. Create base class for environment services
  isNullOrUndefined(obj: any): boolean {
    if (obj == null || typeof obj === 'undefined') return true;
    return false;
  }

  constructor() { }
}
