import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TickethistoryPage } from './tickethistory.page';

const routes: Routes = [
  {
    path: '',
    component: TickethistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TickethistoryPageRoutingModule {}
