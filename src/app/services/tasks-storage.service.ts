import {Plugins} from '@capacitor/core';
import { Injectable } from '@angular/core';
import { IDevopsDetailsService } from '../details/details';
import { DevopsTaskList } from '../generate-tasks/tasks';
const {Storage} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class TasksStorageService implements IDevopsDetailsService<DevopsTaskList> {

  async getDevopsDetails(): Promise<DevopsTaskList> {
    var t = await this.getDetailsFromStorage();
    return JSON.parse(t.value);
  }

  async detailsAvailable(): Promise<boolean> {
    var k = await this.getDetailsFromStorage();
    if(k.value === null) return false;
    return true;
  }
  save(details: DevopsTaskList) {
    this.setStorage("taskDetails",JSON.stringify(details));
  }

  constructor() { }

  private async getDetailsFromStorage(): Promise<any>{
    return Storage.get({key: "taskDetails"});
  }

  setStorage(key: string, val: any){
    Storage.set({key: key, value: val})
  }
}
