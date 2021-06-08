import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestmodalPageRoutingModule } from './guestmodal-routing.module';

import { GuestmodalPage } from './guestmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestmodalPageRoutingModule
  ],
  declarations: [GuestmodalPage]
})
export class GuestmodalPageModule {}
