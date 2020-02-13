import {Plugins} from '@capacitor/core';
import { IStorageService } from './devopsdetails';

const {Storage} = Plugins;

export class StoragebaseService implements IStorageService {

  storageKey: string;

  constructor(key: string) {
    this.storageKey = key;
   }

  save(details: any) {
    this.setStorage(this.storageKey,JSON.stringify(details));
  }

  async getDetailsFromStorage(): Promise<any>{
    return Storage.get({key: this.storageKey});
  }

  async getDevopsDetails(): Promise<any> {
    var t = await this.getDetailsFromStorage();
    return JSON.parse(t.value);
  }

  async detailsAvailable(): Promise<boolean> {
    var k = await this.getDetailsFromStorage();
    if(k.value === null) return false;
    return true;
  }
  
  setStorage(key: string, val: any){
    Storage.set({key: key, value: val})
  }
}

export class EnvironmentbaseService {

   save(details: any) {
    throw new Error("Cannot save to environment.");
  }

  //Now have duplicate code. Create base class for environment services
  isNullOrUndefined(obj: any): boolean {
    if (obj == null || typeof obj === 'undefined') return true;
    return false;
  }
}
