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
  headers:string[] = ["Dev","Test"];
  labels:string[][];
  constructor() { }

  ngOnInit() {
    this.hoursForm = new FormGroup({
      groupName: new FormControl('',)
    });
    this.showAddGroup = false;
    this.labels = new Array();
    this.labels.push(new Array());
    this.labels.push(new Array());
    this.labels[0].push("mo");
    this.labels[0].push("g");
    this.labels[0].push("g");
    this.labels[0].push("g");
    this.labels[0].push("g");
    this.labels[0].push("g");
    this.labels[0].push("g");
    this.labels[0].push("g");
    this.labels[0].push("g");
    this.labels[0].push("g");
    this.labels[1].push("jimi");
  }
  addGroup(){
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
  alertAdd(){
    alert('Add');
  }
  onClickAdd(){
    this.headers.push(this.getGroupName());
    this.showAddGroup = false;
  }
  onClickCancel(){
    this.showAddGroup = false;
  }
  getGroupName(){
    return this.hoursForm.controls.groupName.value;
  }

  onSubmit(abc){

  }
}
