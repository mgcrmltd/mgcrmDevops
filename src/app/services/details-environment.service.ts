import { Injectable } from '@angular/core';
import { DevopsDetails } from '../details/details';
import { environment } from '../../environments/environment'
import { IDevopsDetailsService } from './devopsdetails';
import { EnvironmentbaseService } from './storagebase.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsEnvironmentService extends EnvironmentbaseService implements IDevopsDetailsService<DevopsDetails> {
 
  constructor(){
    super();
  }

  async detailsAvailable(): Promise<boolean> {
    var env = environment;
    if (this.isNullOrUndefined(env)) return false;
    if (this.isNullOrUndefined(env.devopsUrl)
      && this.isNullOrUndefined(env.personalToken)
      && this.isNullOrUndefined(env.projectName)
      && this.isNullOrUndefined(env.teamName)
    ) return false;
    return true;
  }

  async getDevopsDetails(): Promise<DevopsDetails> {
    var deets = new DevopsDetails();
    deets.devopsUrl = environment.devopsUrl;
    deets.personalToken = environment.personalToken;
    deets.teamName = environment.teamName;
    deets.projectName = environment.projectName;
    return deets;
  }

}
