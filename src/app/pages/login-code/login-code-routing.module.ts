import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginCodePage } from './login-code.page';

const routes: Routes = [
  {
    path: '',
    component: LoginCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginCodePageRoutingModule {}
