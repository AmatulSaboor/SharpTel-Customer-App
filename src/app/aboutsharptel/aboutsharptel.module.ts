import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutsharptelPageRoutingModule } from './aboutsharptel-routing.module';

import { AboutsharptelPage } from './aboutsharptel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutsharptelPageRoutingModule
  ],
  declarations: [AboutsharptelPage]
})
export class AboutsharptelPageModule {}
