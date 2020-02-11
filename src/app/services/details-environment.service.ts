import { Injectable, OnInit } from '@angular/core';
import { IDevopsDetailsService, DevopsDetails } from '../details/details';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DetailsEnvironmentService implements OnInit, IDevopsDetailsService<DevopsDetails> {
  save(details:DevopsDetails) {
    throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    
  }

  constructor(){}

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

  isNullOrUndefined(obj: any): boolean {
    if (obj == null || typeof obj === 'undefined') return true;
    return false;
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
