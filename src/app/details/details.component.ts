import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { DevopsService } from '../services/devops.service';
import { environment } from '../../environments/environment';
import { DevopsFactoryService } from '../services/devops-factory.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  loginForm: FormGroup;
  showGetIds: Boolean;
  showSprintName: Boolean;
  sprintName: string;

  constructor(private devopService: DevopsService, private devopsFactory: DevopsFactoryService) { 
    this.loginForm = new FormGroup({
    devopsUrl: new FormControl(
      '', [Validators.required]
    ),
    projectName: new FormControl(
      '', [Validators.required]
    ),
    idList: new FormControl(
      '', [Validators.required]
    ),
    personalToken: new FormControl(
      '', [Validators.required]
    )});

    this.showGetIds = false;
    this.showSprintName = false;
    this.sprintName = "";
  }

  ngOnInit() {}

  getDevopsIds() {
    this.showGetIds = true;
  }

  toggleGetIdsChange(evt) {
    this.showSprintName = !evt.detail.checked;
  }

  getDevopsUrl() {
    return this.loginForm.controls.devopsUrl.value;
  }
  getProjectName(): string {
    return encodeURI(this.loginForm.controls.projectName.value);
  }
  getPersonalToken(): string {
    return this.loginForm.controls.personalToken.value;
  }
  getIds(): string {
    return this.loginForm.controls.idList.value;
  }
  appendId(val: string) {
    if (this.loginForm.controls.idList.value.length > 0) this.loginForm.controls.idList.setValue(this.loginForm.controls.idList.value + ",");
    this.loginForm.controls.idList.setValue(this.loginForm.controls.idList.value + val);
  }
  getidsAsArray(): string[] {
    return this.getIds().split(',');
  }

  getSprintName(): string {
    return this.loginForm.controls.sprintName.value;
  }

  getSprintIds() {
    this.loginForm.controls.idList.setValue("");
    var res = this.devopService.getIterationsFromDevops(this.getPersonalToken(),
      this.getDevopsUrl(),
      this.getProjectName());
    let sprintId = this.getCurrentOrNamedSprint(res);
    if (sprintId == null) {
      alert('No sprint found');
      return;
    }
    var workItems = this.devopService.getIterationWorkItemsFromDevops(this.getPersonalToken(),
      this.getDevopsUrl(),
      this.getProjectName(), sprintId);

    let wis: any = workItems;
    let idArray = wis.workItemRelations.map(function (e) { return e.target.id; })
    this.devopService.getFilteredWorkItemsTypeFromDevops(this.getPersonalToken(),
      this.getDevopsUrl(),
      this.getProjectName(), "System.WorkItemType", "User Story", idArray).then(
        cc => {
          cc.forEach(x => this.appendId(x.id));
          this.parseUserStoryIds();
          this.cancelGetIds();
        }
      );

  }

  parseDevopsUrl() {
    this.loginForm.controls.devopsUrl.setValue(this.trimTrailingChars(
      this.loginForm.controls.devopsUrl.value, '/'
    ));
  }

  getCurrentOrNamedSprint(res: Object): string {
    let arr: any = res;
    var results: any[] = arr.value;
    var curr: any[];
    curr = this.getSprintItemsFromCurrentOrName(results);
    if (curr == null || curr.length == 0) {
      return null;
    }
    return curr[0].id;
  }

  getSprintItemsFromCurrentOrName(results: any[]): any[] {
    if (!this.showSprintName) {
      return results.filter((x) => { return x.attributes.timeFrame == "current" });
    }
    return results.filter((x) => { return x.name == this.getSprintName() });
  }

  parseUserStoryIds() {
    var idsAsWritten: string = this.loginForm.controls.idList.value;
    idsAsWritten = idsAsWritten.replace(/\n/g, ",");
    idsAsWritten = idsAsWritten.replace(/[^0-9]/g, ",");
    idsAsWritten = idsAsWritten.replace(/(,)\1{1,}/g, ",");
    idsAsWritten = this.trimTrailingChars(idsAsWritten, ',');
    this.loginForm.controls.idList.setValue(idsAsWritten);
  }

  cancelGetIds() {
    this.showGetIds = false;
  }

  trimTrailingChars(s, charToTrim) {
    var regExp = new RegExp(charToTrim + "+$");
    var result = s.replace(regExp, "");

    return result;
  }
}
