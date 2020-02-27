import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginCodePageRoutingModule } from './login-code-routing.module';

import { LoginCodePage } from './login-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginCodePageRoutingModule
  ],
  declarations: [LoginCodePage]
})
export class LoginCodePageModule {}
