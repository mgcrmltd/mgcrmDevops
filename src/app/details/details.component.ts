import { Plugins } from '@capacitor/core';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { DevopsService } from '../services/devops.service';
import { environment } from '../../environments/environment';
import { DevopsFactoryService } from '../services/devops-factory.service'
import { DetailsService } from '../services/details.service';
import { DevopsDetails } from './details';

const { Storage } = Plugins;


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input('group') public group: FormGroup;
  showGetIds: Boolean;
  showSprintName: Boolean;
  sprintName: string;
  sprintForm: FormGroup;

  constructor(private devopService: DevopsService,
     private detailsService: DetailsService) {
    this.showGetIds = false;
    this.showSprintName = false;
    this.sprintName = "";
  }

  ngOnInit() {

    this.group.addControl("devopsUrl", new FormControl(
      '', [Validators.required]
    ));
    this.group.addControl("projectName", new FormControl(
      '', [Validators.required]
    ));
    this.group.addControl("idList", new FormControl(
      '', [Validators.required]
    ));
    this.group.addControl("personalToken", new FormControl(
      '', [Validators.required]
    ));

    this.sprintForm = new FormGroup({
      sprintName: new FormControl(
        '' ,
      ),
      teamName: new FormControl(
        '', [Validators.required]
      ),
    });
    var a = environment;
    this.populateDetails();
  }

  async populateDetails() {
    var avail = await this.detailsService.detailsAvailable();
    if (!avail) return;
    this.detailsService.getDevopsDetails().then(deets => {
      this.group.controls.devopsUrl.setValue(deets.devopsUrl);
      this.group.controls.projectName.setValue(deets.projectName);
      this.group.controls.personalToken.setValue(deets.personalToken);
      this.sprintForm.controls.teamName.setValue(deets.teamName);
    }
    );
  }

  setSprintValidators() {

  }

  getDevopsIds() {
    this.showGetIds = true;
    this.sprintForm.controls.sprintName.updateValueAndValidity();
  }

  toggleGetIdsChange(evt) {
    this.showSprintName = !evt.detail.checked;
    if (!evt.detail.checked) {
      this.sprintForm.controls.sprintName.setValidators([Validators.required]);
      this.sprintForm.controls.sprintName.updateValueAndValidity();
    } else {
      this.sprintForm.controls.sprintName.clearValidators();
      this.sprintForm.controls.sprintName.updateValueAndValidity();
    }
  }

  getDevopsUrl() {
    return this.group.controls.devopsUrl.value;
  }
  getProjectName(encode:boolean = true): string {
    if(encode) return encodeURI(this.group.controls.projectName.value);
    return this.group.controls.projectName.value;
  }
  getPersonalToken(): string {
    return this.group.controls.personalToken.value;
  }
  getIds(): string {
    return this.group.controls.idList.value;
  }
  appendId(val: string) {
    if (this.group.controls.idList.value.length > 0) this.group.controls.idList.setValue(this.group.controls.idList.value + ",");
    this.group.controls.idList.setValue(this.group.controls.idList.value + val);
  }
  getidsAsArray(): string[] {
    return this.getIds().split(',');
  }

  getTeamName(encode:boolean = true): string {
    if(encode) return encodeURI(this.sprintForm.controls.teamName.value);
    return this.sprintForm.controls.teamName.value;
  }

  getSprintName(): string {
    return this.sprintForm.controls.sprintName.value;
  }

  getSprintIds() {
    this.group.controls.idList.setValue("");
    this.devopService.getIterationsFromDevops(this.getPersonalToken(),
      this.getDevopsUrl(),
      this.getProjectName(), this.getTeamName()).then(
        res => {
          let sprintId = this.getCurrentOrNamedSprint(res);
          if (sprintId == null) {
            alert('No sprint found');
            return;
          }
          this.devopService.getIterationWorkItemsFromDevops(this.getPersonalToken(),
            this.getDevopsUrl(),
            this.getProjectName(), this.getTeamName(), sprintId).then(
              workItems => {
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
            );
        }, error => { alert(error.message) }
      )
  }

  parseDevopsUrl() {
    this.group.controls.devopsUrl.setValue(this.trimTrailingChars(
      this.group.controls.devopsUrl.value, '/'
    ));
  }

  getFormDetails(): DevopsDetails{
    var deets = new DevopsDetails();
    deets.devopsUrl = this.getDevopsUrl();
    deets.personalToken = this.getPersonalToken();
    deets.projectName = this.getProjectName(false);
    deets.teamName = this.getTeamName(false);
    return deets;
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
    var idsAsWritten: string = this.group.controls.idList.value;
    idsAsWritten = idsAsWritten.replace(/\n/g, ",");
    idsAsWritten = idsAsWritten.replace(/[^0-9]/g, ",");
    idsAsWritten = idsAsWritten.replace(/(,)\1{1,}/g, ",");
    idsAsWritten = this.trimTrailingChars(idsAsWritten, ',');
    this.group.controls.idList.setValue(idsAsWritten);
  }

  cancelGetIds() {
    this.sprintName = "";
    this.showSprintName = false;
    this.showGetIds = false;
    this.sprintForm.controls.sprintName.clearValidators();
    this.sprintForm.controls.sprintName.updateValueAndValidity();
  }

  trimTrailingChars(s, charToTrim) {
    var regExp = new RegExp(charToTrim + "+$");
    var result = s.replace(regExp, "");

    return result;
  }

  saveDetails() {
    if (this.allBlank()) return;
    this.detailsService.save(this.getFormDetails());
  }

  allBlank(): boolean {
    if (this.getPersonalToken() == ""
      && this.getDevopsUrl() == ""
      && this.getProjectName() == ""
      && this.getTeamName() == ""
    ) return true;
    return false;
  }
}
