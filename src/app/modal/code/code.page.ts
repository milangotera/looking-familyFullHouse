import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {

  @ViewChild('fiel0', {static: true})  fiel0; 
  @ViewChild('fiel1', {static: true})  fiel1; 
  @ViewChild('fiel2', {static: true})  fiel2; 
  @ViewChild('fiel3', {static: true})  fiel3;
  @ViewChild('fiel4', {static: true})  fiel4;
  @ViewChild('fiel5', {static: true})  fiel5;  

  code: any = [];
  @Input() verificationId: string;
  @Input() option: number;
  @Input() firstname: string;
  @Input() lastname: string;
  @Input() phone: string;

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

  verify(){
    let signinCredential = firebase.auth.PhoneAuthProvider.credential(
      this.verificationId, 
      `${this.code[0]}${this.code[1]}${this.code[2]}${this.code[3]}${this.code[4]}${this.code[5]}`
    );
    firebase.auth().signInWithCredential(signinCredential).then( (info) =>{
      console.log(info);
      alert("Se ha optenido la informacion");
    }, (error) => {
      console.log(error);
      alert("No se pudo optener la informacion");
    });
  }

  ngOnInit() {
  }

}
