import { Injectable } from '@angular/core';
import {DevopsFactoryService} from './devops-factory.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevopsService {

  constructor(private httpClient: HttpClient, private devopsFactory: DevopsFactoryService) { }

  async callDevopsApi(targetUrl: string, personalToken: string, verb: string, body: Object): Promise<Object>{
    let hdr = this.devopsFactory.getHeader(personalToken);

    switch(verb){
      case 'get' : {
        return this.httpClient.get(
          targetUrl, { headers: hdr }).toPromise();
      }
      case 'patch':{
        hdr = hdr.set('content-type', 'application/json-patch+json');
        return this.httpClient.patch(
          targetUrl, JSON.stringify(body), { headers: hdr }).toPromise();
      }
      case 'post':{
        hdr = hdr.set('content-type', 'application/json-patch+json');
        return this.httpClient.post(
          targetUrl, JSON.stringify(body), { headers: hdr }).toPromise();
      }
    }
  }

  async getWorkItemsFromDevops(personalToken: string, devopsUrl: string, projectName: string, workItemIds: string[]): Promise<any> {
    let targetUrl = this.devopsFactory.getUrlWorkItems(devopsUrl,projectName,workItemIds);
    return this.callDevopsApi(targetUrl,personalToken,'get',null);
  }

  getFilteredWorkItemsTypeFromDevops(personalToken: string, devopsUrl: string,
    projectName: string, fieldName:string, fieldValue: string, workItemIds: string[]): Promise<any> {

      return Promise.resolve(this.getWorkItemsFromDevops(personalToken,devopsUrl,projectName,workItemIds).then(
        x => {
          return  x.value.filter((e) => {return e.fields[fieldName] == fieldValue})
        }));
  }

  async createTaskInDevops(personalToken: string, devopsUrl: string, projectName: string, taskBodyJson: string): Promise<any> {
    let targetUrl = this.devopsFactory.getUrlCreateWorkItem(devopsUrl,projectName,'Task');
    return this.callDevopsApi(targetUrl,personalToken,'post',taskBodyJson);
  }

  async createLinkInDevops(personalToken: string, devopsUrl: string, projectName: string, storyId: string, taskId: string): Promise<any> {
    let targetUrl = this.devopsFactory.getUrlCreateLink(devopsUrl,projectName,taskId);
    var linkBody = this.devopsFactory.getLinkBody(devopsUrl, projectName, storyId);
    return this.callDevopsApi(targetUrl,personalToken,'patch',linkBody);
  }

  async getIterationsFromDevops(personalToken: string, devopsUrl: string, projectName: string, teamName: string): Promise<any> {
    let targetUrl = this.devopsFactory.getUrlIterations(devopsUrl, projectName, teamName);
    return await this.callDevopsApi(targetUrl,personalToken,'get',null);
  }

  getIterationWorkItemsFromDevops(personalToken: string, devopsUrl: string, projectName: string, teamName: string, iterationId: string) {
    let targetUrl = this.devopsFactory.getUrlIterationWorkItems(devopsUrl,projectName,teamName,iterationId);
    return this.callDevopsApi(targetUrl,personalToken,'get',null);
  }

  getCommaSeparatedStringFromArray(strList: string[]) {
    var str: string = "";
    strList.forEach(element => {
      str += element + ","
    });
    return str.substr(0, str.length - 1);
  }
}

