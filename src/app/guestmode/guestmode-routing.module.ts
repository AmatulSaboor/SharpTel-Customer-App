import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestmodePage } from './guestmode.page';

const routes: Routes = [
  {
    path: '',
    component: GuestmodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestmodePageRoutingModule {}
