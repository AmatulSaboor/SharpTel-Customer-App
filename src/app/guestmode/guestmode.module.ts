import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestmodePageRoutingModule } from './guestmode-routing.module';

import { GuestmodePage } from './guestmode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestmodePageRoutingModule
  ],
  declarations: [GuestmodePage]
})
export class GuestmodePageModule {}
