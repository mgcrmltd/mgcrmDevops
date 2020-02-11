import {Plugins} from '@capacitor/core';
import { Injectable, OnInit } from '@angular/core';
import { IDevopsDetailsService, DevopsDetails } from '../details/details';

const {Storage} = Plugins;



@Injectable({
  providedIn: 'root'
})
export class DetailsStorageService implements OnInit, IDevopsDetailsService<DevopsDetails> {
  save(details:DevopsDetails) {
    this.setStorage("devopsDetails",JSON.stringify(details));
  }

  async getDevopsDetails(): Promise<DevopsDetails> {
    var t = await this.getDetailsFromStorage();
    return JSON.parse(t.value);
  }

  async detailsAvailable(): Promise<boolean> {
    var k = await this.getDetailsFromStorage();
    if(k.value === null) return false;
    return true;
  }
  ngOnInit(): void {
    
  }

  constructor() { }

  private async getDetailsFromStorage(): Promise<any>{
    return Storage.get({key: "devopsDetails"});
  }

  setStorage(key: string, val: any){
    Storage.set({key: key, value: val})
  }
}
