import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {

  @ViewChild('fiel0')  fiel0; 
  @ViewChild('fiel1')  fiel1; 
  @ViewChild('fiel2')  fiel2; 
  @ViewChild('fiel3')  fiel3;
  @ViewChild('fiel4')  fiel4;
  @ViewChild('fiel5')  fiel5;  

  code: any = [];

  constructor(
  ) {
    this.code[0] = null;
    this.code[1] = null;
    this.code[2] = null;
    this.code[3] = null;
  }

  resetCode(pos){
    this.code[pos] = null;
  }

  setCode(event, pos){
    this.code[pos] = event.target.value;
    if(event.target.value){
      if(pos == 0){
        this.fiel1.setFocus();
      }
      if(pos == 1){
        this.fiel2.setFocus();
      }
      if(pos == 2){
        this.fiel3.setFocus();
      }
      if(pos == 3){
        this.fiel4.setFocus();
      }
      if(pos == 4){
        this.fiel5.setFocus();
      }
      event.target.blur();
    }
  }

  ngOnInit() {
  }

}
