import { Injectable } from '@angular/core';
import { DevopsTaskList, DevopsTask } from '../generate-tasks/tasks';
import { environment } from '../../environments/environment'
import { IDevopsDetailsService } from './devopsdetails';
import { EnvironmentbaseService } from './storagebase.service';


@Injectable({
  providedIn: 'root'
})
export class TasksEnvironmentService extends EnvironmentbaseService implements IDevopsDetailsService<DevopsTaskList>  {
  
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
  
  constructor() {
    super();
  }
}
