import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DevopsFactoryService {

  constructor(private httpClient: HttpClient) { }

  getHeader(personalToken: string):HttpHeaders{
    let hdr = new HttpHeaders();
    hdr = hdr.set('authorization', 'Basic ' + this.getHeaderToken(personalToken));
    return hdr;
  }

  getDevopsBaseUrl(devopsUrl: string, projectName: string){
    return `${devopsUrl}/${projectName}`;
  }

  getUrlWorkItems(devopsUrl: string, projectName: string, workItemIds: string[], expand:Boolean){
    let expandText = expand ? '&$expand=relations' : '';
    return `${this.getDevopsBaseUrl(devopsUrl,projectName)}/_apis/wit/workitems?ids=${this.getCommaSeparatedStringFromArray(workItemIds)}${expandText}&api-version=5.0`;
  }

  getUrlCreateWorkItem(devopsUrl: string, projectName: string, itemType: string){
    return `${this.getDevopsBaseUrl(devopsUrl,projectName)}/_apis/wit/workitems/$${itemType}?api-version=5.1`;
  }

  getUrlCreateLink(devopsUrl: string, projectName: string, taskId: string){
    return `${this.getDevopsBaseUrl(devopsUrl,projectName)}/_apis/wit/workitems/${taskId}?api-version=5.1`;
  }

  getUrlIterations(devopsUrl: string, projectName: string, teamName){
    return `${this.getDevopsBaseUrl(devopsUrl,projectName)}/${teamName}/_apis/work/teamsettings/iterations?api-version=5.1`;
  }

  getUrlIterationWorkItems(devopsUrl: string, projectName: string, teamName:string, iterationId: string){
    return `${this.getDevopsBaseUrl(devopsUrl,projectName)}/${teamName}/_apis/work/teamsettings/iterations/${iterationId}/workitems?api-version=5.1-preview.1`;
  }

  getTaskBodies(workItem: any, taskTitles: string[], useComplexTitle: Boolean): any[] {
    let taskBodies: any[] = new Array();
   
      taskTitles.forEach(tt => {
        var taskBodyJson = this.getTaskBody(
          workItem.id,
          this.getTaskTitle(tt, workItem.fields["System.Title"], workItem.id, useComplexTitle),
          workItem.fields["System.AreaPath"],
          workItem.fields["System.IterationPath"]);
        taskBodies.push(taskBodyJson);
      });
    return taskBodies;
  }

  getTaskTitle(taskTitle: string, userStoryTitle: string, userStoryId: string, useComplexTitle: Boolean): string {
    if (useComplexTitle === false) return taskTitle;
    return taskTitle + " for Story " + userStoryId + " - " + userStoryTitle;
  }

  getTaskBody(wiId: string, taskTitle: string, areaPath: string,
    iterationPath: string): any[] {
    var jsObj: any = new Object();
    jsObj.op = "add";
    jsObj.path = "/fields/System.Title";
    jsObj.from = null;
    jsObj.value = taskTitle;

    var jsObjArea: any = new Object();
    jsObjArea.op = "add";
    jsObjArea.path = "/fields/System.AreaPath";
    jsObjArea.from = null;
    jsObjArea.value = areaPath;

    var jsObjIteration: any = new Object();
    jsObjIteration.op = "add";
    jsObjIteration.path = "/fields/System.IterationPath";
    jsObjIteration.from = null;
    jsObjIteration.value = iterationPath;

    let jsonObjArray: any[] = new Array();
    jsonObjArray.push(jsObj);
    jsonObjArray.push(jsObjArea);
    jsonObjArray.push(jsObjIteration);

    return jsonObjArray;
  }

  getLinkBody(devopsUrl: string, projectName: string, storyId: string): any[] {
    var jsObj: any = new Object();
    jsObj.op = "add";
    jsObj.path = "/relations/-";
    jsObj.value = new Object();

    jsObj.value.rel = "System.LinkTypes.Hierarchy-Reverse";
    jsObj.value.url = `${devopsUrl}/${projectName}/_apis/wit/workitems/${storyId}`;
    let jsonObjArray: any[] = new Array();
    jsonObjArray.push(jsObj);
    return jsonObjArray;
  }

  private getHeaderToken(token: string) {
    const byteArr = this.stringToByteArray(":" + token);
    return this.byteArrayToBase64String(byteArr);
  }

  byteArrayToBase64String(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  stringToByteArray(str) {
    let utf8 = [];
    for (let i = 0; i < str.length; i++) {
      let charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6),
          0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
        i++;
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode = 0x10000 + (((charcode & 0x3ff) << 10)
          | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  }

  getCommaSeparatedStringFromArray(strList: string[]) {
    var str: string = "";
    strList.forEach(element => {
      str += element + ","
    });
    return str.substr(0, str.length - 1);
  }
}
