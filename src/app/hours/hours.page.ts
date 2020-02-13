import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DetailsComponent } from '../details/details.component'
import { DevopsService } from '../services/devops.service';
import { environment } from 'src/environments/environment';
import { GroupSum } from './groupsum';
import { HoursService } from '../services/hours.service';
import { DevopsHoursGroupList, DevopsHoursGroup } from './hours';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.page.html',
  styleUrls: ['./hours.page.scss'],
})
export class HoursPage implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.populateDetails()
  }

  @ViewChild('appDetails', { static: false }) details: DetailsComponent;

  hoursForm: FormGroup;
  showAddGroup: Boolean;
  showDetails: number;
  headers: string[] = [];
  labels: string[][];
  gsArray:GroupSum[];
  constructor(private devopService: DevopsService, private hoursService: HoursService) { }

  ngOnInit() {
    this.hoursForm = new FormGroup({
      groupName: new FormControl('')
    });
    this.showAddGroup = false;
    this.showDetails = 4;
    this.labels = new Array();
    this.gsArray = new Array();
  }

  async sumHours() {
    this.gsArray = new Array();
    this.headers.forEach((header,index) =>{
      this.gsArray.push(new GroupSum(header, this.labels[index]))
    });

    this.resetVals();
    let d = this.details;
    d.parseUserStoryIds();
    d.parseDevopsUrl();
    await this.devopService.getWorkItemsFromDevops(
      d.getPersonalToken(),
      d.getDevopsUrl(),
      d.getProjectName(),
      d.getidsAsArray(), true).then(
        async workItems => {
          for(let workItem of workItems.value){
            for(const relation of workItem.relations){
              if (relation.attributes.name == "Child") {
                await this.devopService.callDevopsApi(relation.url, d.getPersonalToken(), 'get', null).then(devopsObj => {
                  this.gsArray.forEach(x=>{
                    x.processDevopsTaskObject(devopsObj);
                  })
                })
              }
            }
          }
        }
      );
    console.log(this.gsArray);
  }

  private resetVals() {
    this.details.showGetIds = false;
    this.details.showSprintName = false;
    this.details.sprintName = "";
  }

  async populateDetails() {
    var avail = await this.hoursService.detailsAvailable();
    if (!avail) return;
    this.hoursService.getDevopsDetails().then(deets => {
      deets.groups.forEach((group,i) =>{
        this.headers.push(group.group);
        this.labels.push(new Array());
        group.tags.forEach(tag => {
        this.labels[i].push(tag.tag);
      });
      });
    });
  }

  getFormDetails(): DevopsHoursGroupList{
    var deets = new DevopsHoursGroupList();
    this.headers.forEach((header,index) =>{
      deets.groups.push(new DevopsHoursGroup(header, this.labels[index]));
    });
    return deets;
  }

  save(){
    if (this.allBlank()) return;
    this.hoursService.save(this.getFormDetails());
  }

  allBlank(): boolean {
    return this.headers.length < 1 || this.labels.length < 1;
  }

 

  displayDetails() {
    this.showDetails = this.showDetails == 0 ? 4 : 0;
  }
  displayAddGroup() {
    this.showAddGroup = true;
  }

  equalTo(x, y) {
    return x === y;
  }
  alertRemove(i: number) {
    if (!window.confirm(`Remove ${this.headers[i]}?`)) return;
    this.labels.splice(i, 1);
    this.headers = this.headers.filter(x => { return !this.equalTo(x, this.headers[i]) });
  }
  alertAdd(i) {
    if ((<HTMLInputElement>document.getElementById(this.headers[i])).value == "") return;
    this.labels[i].push((<HTMLInputElement>document.getElementById(this.headers[i])).value);
    (<HTMLInputElement>document.getElementById(this.headers[i])).value = "";
  }
  removeTag(header: number, tag: number) {
    this.labels[header].splice(tag, 1);
  }
  onClickAdd() {
    if (this.headers.includes(this.getGroupName())) return;
    this.addGroup(this.getGroupName());
    this.setGroupName("");
    this.showAddGroup = false;
  }
  addGroup(name: string) {
    this.headers.push(name);
    this.labels.push(new Array());
  }
  onClickCancel() {
    this.showAddGroup = false;
  }
  getGroupName() {
    return this.hoursForm.controls.groupName.value;
  }
  setGroupName(txt: string) {
    this.hoursForm.controls.groupName.setValue(txt);
  }

  onSubmit(abc) {

  }
}
