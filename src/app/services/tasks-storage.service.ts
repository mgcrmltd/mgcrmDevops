import { Injectable } from '@angular/core';
import { DevopsTaskList } from '../generate-tasks/tasks';
import { IDevopsDetailsService } from './devopsdetails';
import { StoragebaseService } from './storagebase.service';

@Injectable({
  providedIn: 'root'
})
export class TasksStorageService extends StoragebaseService implements IDevopsDetailsService<DevopsTaskList>  {

  constructor(){
    super("taskDetails");
  }
  
}
