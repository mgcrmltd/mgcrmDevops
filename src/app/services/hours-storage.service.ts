import { Injectable } from '@angular/core';
import { StoragebaseService } from './storagebase.service';
import { IDevopsDetailsService } from './devopsdetails';
import { DevopsHoursGroup } from '../hours/hours';

@Injectable({
  providedIn: 'root'
})
export class HoursStorageService extends StoragebaseService implements IDevopsDetailsService<DevopsHoursGroup> {

  constructor() {
    super("hoursDetails");
  }

}
