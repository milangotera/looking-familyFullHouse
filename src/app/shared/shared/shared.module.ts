import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from '../tab/tab.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [TabComponent],
  exports: [TabComponent]
})
export class SharedModule { }
