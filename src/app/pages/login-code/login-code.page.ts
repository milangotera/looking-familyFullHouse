import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login-code',
  templateUrl: './login-code.page.html',
  styleUrls: ['./login-code.page.scss'],
})
export class LoginCodePage implements OnInit {

  @ViewChild('fiel0', {static: true})  fiel0; 
  @ViewChild('fiel1', {static: true})  fiel1; 
  @ViewChild('fiel2', {static: true})  fiel2; 
  @ViewChild('fiel3', {static: true})  fiel3;
  @ViewChild('fiel4', {static: true})  fiel4;
  @ViewChild('fiel5', {static: true})  fiel5;

  code: any = [];
  page: string;
  token: string;
  phone: string;
  firstname: string = null;
  lastname: string = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    public alert : AlertController,
    ){
      this.code[0] = null;
      this.code[1] = null;
      this.code[2] = null;
      this.code[3] = null;
    }

    ngOnInit() {
    }

    ionViewWillEnter(){
      this.page = this.activatedRoute.snapshot.paramMap.get('page');
      this.token  = this.activatedRoute.snapshot.paramMap.get('token');
      this.phone  = this.activatedRoute.snapshot.paramMap.get('phone');
    }

    async alertRequired() {
      const alert = await this.alert.create({
        header: 'Hola!',
        message: `
          <p class="ion-text-justify">
            Te comentamos que es necesario que completes tus datos para configurar tu cuenta.
            <br>
          </p>
        `,
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.router.navigateByUrl('/');
            }
          },
          {
            text: 'OK',
            handler: () => {
              
            }
          }
        ]
      });
  
      await alert.present();
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

    send(){
      let phone  = this.phone;
      let page  = this.page;
      let router = this.router;
      let signinCredential = firebase.auth.PhoneAuthProvider.credential(
        this.token, 
        `${this.code[0]}${this.code[1]}${this.code[2]}${this.code[3]}${this.code[4]}${this.code[5]}`
      );
      firebase.auth().signInWithCredential(signinCredential).then( (info) =>{
        console.log(info);
        router.navigateByUrl(`/spash/${page}/${phone}`);
      }, (error) => {
        console.log(error);
        alert("Parece que tu codigo no es correcto");
      });
    }
  
    verify(){
      let error: boolean = false;
      if(this.page == '2'){
        if(this.firstname == '' || this.firstname == null || this.lastname == '' || this.lastname == null){
          error = true;
          this.alertRequired();
        }
      }
      if(!error){
        this.storage.set('family_data', { phone: this.phone, firstname: this.firstname, lastname: this.lastname }).then( (family_data:any) =>{
          //this.send();
          this.router.navigateByUrl(`/spash/${this.page}/${this.phone}`);
        });
      }
    }
}
