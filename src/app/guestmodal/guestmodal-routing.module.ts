import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestmodalPage } from './guestmodal.page';

const routes: Routes = [
  {
    path: '',
    component: GuestmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestmodalPageRoutingModule {}
