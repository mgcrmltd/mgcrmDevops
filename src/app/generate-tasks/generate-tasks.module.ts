import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GenerateTasksPageRoutingModule } from './generate-tasks-routing.module';
// import { DetailsComponent} from '../details/details.component'
import { GenerateTasksPage } from './generate-tasks.page';
import { DetailsModule } from '../details/details.module';
// import { UseParentFormDirective} from '../use-parent-form.directive'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetailsModule,
    GenerateTasksPageRoutingModule
  ],
  declarations: [GenerateTasksPage
    // , DetailsComponent
  ]
})
export class GenerateTasksPageModule {}
