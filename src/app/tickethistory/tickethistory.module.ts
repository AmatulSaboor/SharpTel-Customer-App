import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TickethistoryPageRoutingModule } from './tickethistory-routing.module';

import { TickethistoryPage } from './tickethistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TickethistoryPageRoutingModule
  ],
  declarations: [TickethistoryPage]
})
export class TickethistoryPageModule {}
