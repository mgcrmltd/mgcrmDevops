import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { EnvironmentbaseService } from './storagebase.service';
import { IDevopsDetailsService } from './devopsdetails';
import { DevopsHoursGroup, DevopsHoursTag, DevopsHoursGroupList } from '../hours/hours';

@Injectable({
  providedIn: 'root'
})
export class HoursEnvironmentService extends EnvironmentbaseService
 implements IDevopsDetailsService<DevopsHoursGroupList>{
  constructor() {
    super();
  }

  async getDevopsDetails(): Promise<DevopsHoursGroupList> {
     let env = environment;
     let dhgList = new DevopsHoursGroupList();
     env.hoursCalc.forEach(x =>{
       dhgList.groups.push(new DevopsHoursGroup(x.group, x.tags.map(y => {return y.tag;})))
     });
     return dhgList;
  }

  async detailsAvailable(): Promise<boolean> {
    let env = environment;
    if (this.isNullOrUndefined(env)) return false;
    if (this.isNullOrUndefined(env.hoursCalc)) return false;
    if (this.isNullOrUndefined(env.hoursCalc.length < 1)) return false;
    return true;
  }

}
