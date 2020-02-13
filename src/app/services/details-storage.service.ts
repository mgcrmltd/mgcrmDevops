import { Injectable } from '@angular/core';
import { DevopsDetails } from '../details/details';
import { IDevopsDetailsService } from './devopsdetails';
import { StoragebaseService } from './storagebase.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsStorageService extends StoragebaseService  implements IDevopsDetailsService<DevopsDetails> {
  save(details:DevopsDetails) {
    this.setStorage("devopsDetails",JSON.stringify(details));
  }

  constructor() {
    super("devopsDetails");
  }
}
