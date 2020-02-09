import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoursPageRoutingModule } from './hours-routing.module';

import { HoursPage } from './hours.page';
import { DetailsModule } from '../details/details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DetailsModule,
    HoursPageRoutingModule
  ],
  declarations: [HoursPage]
})
export class HoursPageModule {}
