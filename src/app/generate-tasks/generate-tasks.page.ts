import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { DevopsService } from '../services/devops.service'
import { environment } from '../../environments/environment'
import { DevopsFactoryService } from '../services/devops-factory.service'


@Component({
  selector: 'app-generate-tasks',
  templateUrl: './generate-tasks.page.html',
  styleUrls: ['./generate-tasks.page.scss'],
})
export class GenerateTasksPage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  loginForm: FormGroup;
  createdTaskCount: number;
  createdLinkCount: number;
  failedTaskCount: number;
  outputText: string;
  complexText: string;
  sprintName: string;
  showGetIds: Boolean;
  showSprintName: Boolean;
  color: string= "red";

  taskTitles: string[] = [
    "JavaScript",
    "Plugins",
    "Customization",
    "QA Exec",
    "QA Prep"
  ];

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
      ),
      taskTitleToAdd: new FormControl(
        ''
      ),
      complexTitle: new FormControl(
        ''
      ),
      sprintName: new FormControl(
        ''
      ),
    });
    this.resetVals()
    this.complexText = "";
  }

  getFailureColour(){
    return this.failedTaskCount == 0 ? "medium" : "red";
  }

  ngOnInit() {
    this.loginForm.controls.devopsUrl.setValue(environment.devopsUrl);
    this.loginForm.controls.projectName.setValue(environment.projectName);
    this.loginForm.controls.personalToken.setValue(environment.personalToken);
    this.loginForm.controls.complexTitle.setValue(true);
    this.toggleChange();
    this.loginForm.markAllAsTouched();
  }

  toggleChange() {
    if (this.loginForm.controls.complexTitle.value === true) {
      this.complexText = " for user story 39846 - This is a sample Story Title";
    } else {
      this.complexText = "";
    }
  }

  cancelGetIds() {
    this.showGetIds = false;
  }

  toggleGetIdsChange(evt) {
    this.showSprintName = !evt.detail.checked;
  }

  getSprintItemsFromCurrentOrName(results: any[]): any[] {
    if (!this.showSprintName) {
      return results.filter((x) => { return x.attributes.timeFrame == "current" });
    }
    return results.filter((x) => { return x.name == this.getSprintName() });
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


  getSprintIds() {
    this.loginForm.controls.idList.setValue("");
    this.devopService.getIterationsFromDevops(this.getPersonalToken(),
      this.getDevopsUrl(),
      this.getProjectName()).then(res => {
        let sprintId = this.getCurrentOrNamedSprint(res);
        if (sprintId == null) {
          alert('No sprint found');
          return;
        }
        this.devopService.getIterationWorkItemsFromDevops(this.getPersonalToken(),
          this.getDevopsUrl(),
          this.getProjectName(), sprintId).then(workItems => {
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
          )
      })
  }

  async onLoginSubmit() {
    this.resetVals();
    this.parseUserStoryIds();
    this.parseDevopsUrl();
    this.devopService.getWorkItemsFromDevops(
      this.getPersonalToken(),
      this.getDevopsUrl(),
      this.getProjectName(),
      this.getidsAsArray()).then(
        workItems => {
          workItems.value.forEach(
            workItem => {
              let taskBodies = this.devopsFactory.getTaskBodies(workItem, this.taskTitles, this.loginForm.controls.complexTitle.value);
              taskBodies.forEach(tb => {
                this.devopService.createTaskInDevops(this.getPersonalToken(), this.getDevopsUrl(), this.getProjectName(), tb).then(
                  res => {
                    this.createdTaskCount += 1;
                    this.appendOutputText("Created: " + tb[0].value);
                    setTimeout(() => {
                      this.devopService.createLinkInDevops(this.getPersonalToken(), this.getDevopsUrl(), this.getProjectName(), workItem.id, res.id).then(
                        resLink => {
                          this.createdLinkCount += 1;
                          this.appendOutputText(`Linked ${res.id} to ${workItem.id}`);
                        },
                        error => {
                          this.failedTaskCount += 1;
                          this.appendOutputText(`Failed to link ${res.id} to ${workItem.id}`);
                          console.log(error);
                        }
                      )
                    }, 3000); //Got frequent linking errors without this
                  },
                  error => {
                    this.failedTaskCount += 1;
                    this.appendOutputText("Failed: " + tb[0].value);
                    console.log(error);
                  }
                )
              })
            }
          );
        },
        error => {
          console.log(error);
          alert('Error! Check your list of user story IDs contains valid numbers.\nUse developer tools to see error in console');
        }
      );
  }

  private resetVals() {
    this.failedTaskCount = 0;
    this.createdTaskCount = 0;
    this.createdLinkCount = 0;
    this.showGetIds = false;
    this.showSprintName = false;
    this.outputText = "";
    this.sprintName = "";
  }

  appendOutputText(textToAdd: string) {
    if (this.outputText.length > 0) this.outputText += "\n";
    this.outputText += textToAdd;
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
  getTaskTitles(): string[] {
    return this.taskTitles;
  }

  parseUserStoryIds() {
    var idsAsWritten: string = this.loginForm.controls.idList.value;
    idsAsWritten = idsAsWritten.replace(/\n/g, ",");
    idsAsWritten = idsAsWritten.replace(/[^0-9]/g, ",");
    idsAsWritten = idsAsWritten.replace(/(,)\1{1,}/g, ",");
    idsAsWritten = this.trimTrailingChars(idsAsWritten, ',');
    this.loginForm.controls.idList.setValue(idsAsWritten);
  }

  parseDevopsUrl() {
    this.loginForm.controls.devopsUrl.setValue(this.trimTrailingChars(
      this.loginForm.controls.devopsUrl.value, '/'
    ));
  }

  trimTrailingChars(s, charToTrim) {
    var regExp = new RegExp(charToTrim + "+$");
    var result = s.replace(regExp, "");

    return result;
  }

  getDevopsIds() {
    this.showGetIds = true;
  }

  deleteTaskTitle(id) {
    this.taskTitles = this.taskTitles.filter(function (e) { return e !== id })
  }

  addTaskTitle() {
    this.slides.slideTo(1);
  }

  addTask() {
    var t = this.loginForm.controls.taskTitleToAdd.value;
    if (t === null || t === undefined) return;
    this.taskTitles.push(t);
    this.loginForm.controls.taskTitleToAdd.setValue("");
    this.slides.slideTo(0);
  }
  cancelAddTask() {
    this.slides.slideTo(0);
  }
}
