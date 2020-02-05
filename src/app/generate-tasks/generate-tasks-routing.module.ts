import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateTasksPage } from './generate-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateTasksPageRoutingModule {}
