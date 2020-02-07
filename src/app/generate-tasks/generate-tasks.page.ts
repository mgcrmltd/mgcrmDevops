import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { DevopsService } from '../services/devops.service'
import { DevopsFactoryService } from '../services/devops-factory.service'
import {DetailsComponent} from '../details/details.component'


@Component({
  selector: 'app-generate-tasks',
  templateUrl: './generate-tasks.page.html',
  styleUrls: ['./generate-tasks.page.scss'],
})
export class GenerateTasksPage implements OnInit, AfterViewInit {
 
  @ViewChild('slides', { static: false }) slides: IonSlides;
  @ViewChild('appDetails', { static: false }) details: DetailsComponent;
  public loginForm: FormGroup;
  createdTaskCount: number;
  createdLinkCount: number;
  failedTaskCount: number;
  outputText: string;
  complexText: string;
  color: string = "red";

  taskTitles: string[] = [
    "JavaScript",
    "Plugins",
    "Customization",
    "QA Exec",
    "QA Prep"
  ];

  constructor(private devopService: DevopsService, 
    private devopsFactory: DevopsFactoryService) {
    this.loginForm = new FormGroup({

      taskTitleToAdd: new FormControl(
        ''
      ),
      complexTitle: new FormControl(
        ''
      ),
    });
    this.complexText = "";
  }

  ngAfterViewInit(): void {
    this.resetVals();
    this.loginForm.controls.complexTitle.setValue(true);
    this.toggleChange();
    this.loginForm.markAllAsTouched();
  }

  getFailureColour() {
    return this.failedTaskCount == 0 ? "medium" : "red";
  }

  ngOnInit() {
    
  }

  toggleChange() {
    if (this.loginForm.controls.complexTitle.value === true) {
      this.complexText = " for user story 39846 - This is a sample Story Title";
    } else {
      this.complexText = "";
    }
  }

  async onLoginSubmit() {
    this.resetVals();
    this.details.parseUserStoryIds();
    this.details.parseDevopsUrl();
    this.devopService.getWorkItemsFromDevops(
      this.details.getPersonalToken(),
      this.details.getDevopsUrl(),
      this.details.getProjectName(),
      this.details.getidsAsArray()).then(
        workItems => {
          workItems.value.forEach(
            workItem => {
              let taskBodies = this.devopsFactory.getTaskBodies(workItem, this.taskTitles, this.loginForm.controls.complexTitle.value);
              taskBodies.forEach(tb => {
                this.devopService.createTaskInDevops(this.details.getPersonalToken(), this.details.getDevopsUrl(), this.details.getProjectName(), tb).then(
                  res => {
                    this.createdTaskCount += 1;
                    this.appendOutputText("Created: " + tb[0].value);
                    setTimeout(() => {
                      this.devopService.createLinkInDevops(this.details.getPersonalToken(), this.details.getDevopsUrl(), this.details.getProjectName(), workItem.id, res.id).then(
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
    this.details.showGetIds = false;
    this.details.showSprintName = false;
    this.outputText = "";
    this.details.sprintName = "";
    
  }

  appendOutputText(textToAdd: string) {
    if (this.outputText.length > 0) this.outputText += "\n";
    this.outputText += textToAdd;
  }


  getTaskTitles(): string[] {
    return this.taskTitles;
  }


  trimTrailingChars(s, charToTrim) {
    var regExp = new RegExp(charToTrim + "+$");
    var result = s.replace(regExp, "");

    return result;
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
