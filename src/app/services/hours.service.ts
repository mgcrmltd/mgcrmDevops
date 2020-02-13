import { Injectable } from '@angular/core';
import { DevopsDetailsServiceStrategyBase } from './devopsdetails';
import { DevopsHoursGroupList } from '../hours/hours';
import { HoursEnvironmentService } from './hours-environment.service';
import { HoursStorageService } from './hours-storage.service';

@Injectable({
  providedIn: 'root'
})

export class HoursService extends DevopsDetailsServiceStrategyBase<DevopsHoursGroupList> {

  constructor(private hoursEnvService: HoursEnvironmentService,
    private hoursStorageService: HoursStorageService) {
    super(hoursStorageService,hoursEnvService);
  }
}
