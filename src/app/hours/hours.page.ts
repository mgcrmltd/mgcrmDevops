import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.page.html',
  styleUrls: ['./hours.page.scss'],
})
export class HoursPage implements OnInit {
  hoursForm: FormGroup;
  showAddGroup:Boolean;
  showDetails:number;
  headers:string[] = [];
  labels:string[][];
  constructor() { }

  ngOnInit() {
    this.hoursForm = new FormGroup({
      groupName: new FormControl('',)
    });
    this.showAddGroup = false;
    this.showDetails = 4;
    this.labels = new Array();
    // this.labels.push(new Array());
    // this.labels.push(new Array());
    // this.labels[0].push("mo");
    // this.labels[0].push("g");
    // this.labels[1].push("jimi");
  }

  displayDetails(){
    this.showDetails = this.showDetails == 0 ? 4 : 0;
  }
  displayAddGroup(){
    this.showAddGroup = true;
  }

  equalTo(x, y){
    return x === y;
  }
  alertRemove(i: number){
    if(!window.confirm(`Remove ${this.headers[i]}?`)) return;
    this.labels.splice(i,1);
    this.headers = this.headers.filter(x => {return !this.equalTo(x,this.headers[i])});
  }
  alertAdd(i){
    if((<HTMLInputElement>document.getElementById(this.headers[i])).value == "") return;
    this.labels[i].push((<HTMLInputElement>document.getElementById(this.headers[i])).value);
    (<HTMLInputElement>document.getElementById(this.headers[i])).value = "";
  }
  removeTag(header:number, tag:number){
    this.labels[header].splice(tag,1);
  }
  onClickAdd(){
    if(this.headers.includes(this.getGroupName())) return;
    this.addGroup(this.getGroupName());
    this.setGroupName("");
    this.showAddGroup = false;
  }
  addGroup(name: string){
    this.headers.push(name);
    this.labels.push(new Array());
  }
  onClickCancel(){
    this.showAddGroup = false;
  }
  getGroupName(){
    return this.hoursForm.controls.groupName.value;
  }
  setGroupName(txt: string){
    this.hoursForm.controls.groupName.setValue(txt);
  }

  onSubmit(abc){

  }
}
