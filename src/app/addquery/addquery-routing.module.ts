import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddqueryPage } from './addquery.page';

const routes: Routes = [
  {
    path: '',
    component: AddqueryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddqueryPageRoutingModule {}
