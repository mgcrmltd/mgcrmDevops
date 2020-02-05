import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateTasksPageRoutingModule } from './generate-tasks-routing.module';
import { DetailsComponent} from '../details/details.component'
import { GenerateTasksPage } from './generate-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GenerateTasksPageRoutingModule
  ],
  declarations: [GenerateTasksPage, DetailsComponent]
})
export class GenerateTasksPageModule {}
