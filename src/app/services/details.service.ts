import { Injectable } from '@angular/core';
import { DevopsDetails } from '../details/details';
import { DetailsEnvironmentService } from './details-environment.service';
import { DetailsStorageService } from './details-storage.service';
import { DevopsDetailsServiceStrategyBase } from './devopsdetails';

@Injectable({
  providedIn: 'root'
})

export class DetailsService extends DevopsDetailsServiceStrategyBase<DevopsDetails> {
  constructor(private detailsEnvService: DetailsEnvironmentService,
    private detailsStorageService: DetailsStorageService) {
    super(detailsStorageService,detailsEnvService);
  }
}
