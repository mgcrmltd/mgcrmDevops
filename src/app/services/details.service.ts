import { Injectable } from '@angular/core';
import { IDevopsDetailsService, DevopsDetails } from '../details/details';
import { DetailsEnvironmentService } from './details-environment.service';
import { DetailsStorageService } from './details-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsService implements IDevopsDetailsService<DevopsDetails> {

  save(details:DevopsDetails) {
    this.detailsStorageService.save(details);
  }
  
  constructor(private detailsEnvService: DetailsEnvironmentService,
    private detailsStorageService: DetailsStorageService) { }
  
  async detailsAvailable(): Promise<boolean> {
    let avail =  await this.detailsStorageService.detailsAvailable();
    if(avail) return true;
    return await this.detailsEnvService.detailsAvailable();
  }

  async getDevopsDetails(): Promise<DevopsDetails> {
    if(await this.detailsStorageService.detailsAvailable()){
      return await this.detailsStorageService.getDevopsDetails();
    }
    else if(await this.detailsEnvService.detailsAvailable()){
      return await this.detailsEnvService.getDevopsDetails();
    }
    return null;
  }
}
