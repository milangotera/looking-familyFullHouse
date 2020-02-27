import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CountriesPage } from '../../modal/countries/countries.page';
import { ApiService } from '../../services/api.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  zoneSelect : any = {
    "flag": "https://restcountries.eu/data/col.svg",
    "cioc": "COL",
    "name": "Peru",
    "callingCodes": ["57"]
  };

  phone: number;
  lastname: String;
  firstname: String;

  disabled: boolean = false;
  btn: string = `VERIFICAR NÚMERO DE TELÉFONO`;

  constructor(
    public modalController: ModalController,
    public api: ApiService,
    public alert : AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.phone = null;
    this.lastname = null;
    this.firstname = null;
  }

  setPhone(phone){
    this.phone = phone;
  }

  async welcomeConfirm() {
    const alert = await this.alert.create({
      //header: 'Hola!',
      message: `
        <p class="ion-text-justify">
          Parece que no has sido invitado pero tranquilo que también puedes crear tu propia Family Full House.
          <br>
        </p>
        <p class="ion-text-center"><b>¿Deseas crear tu propia Family Full House?</b></p>
      `,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.phone = null;
          }
        },
        {
          text: 'SI',
          handler: (data) => {
            this.send(2);
          }
        }
      ]
    });

    await alert.present();
  }

  checkPhone(){
    this.disabled = true;
    this.btn = `VERIFICANDO...`;
    this.api.checkPhone(`+${this.zoneSelect.callingCodes[0]}${this.phone}`).then( (res:any) =>{
      this.disabled = false;
      this.btn = `VERIFICAR NÚMERO DE TELÉFONO`;
      this.welcomeConfirm();
    }).catch( (err) =>{
      this.disabled = false;
      this.btn = `VERIFICAR NÚMERO DE TELÉFONO`;
      this.send(1);
    });
  }

  async selectCountries() {
    const modal = await this.modalController.create({
      cssClass: 'app-modal-countries',
      component: CountriesPage,
      componentProps: {
        "zoneSelect": this.zoneSelect,
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (typeof dataReturned.data !== 'undefined') {
        this.zoneSelect = dataReturned.data;
        console.log(dataReturned);
      }
    });
 
    return await modal.present();
  }

  send(page){
    let router = this.router;
    let phone = `+${this.zoneSelect.callingCodes[0]}${this.phone}`;
    router.navigateByUrl(`/login-code/${page}/${phone}/tyutyutiutyutyufrytrytderdytdfgfjfhgfhgfdgdgfdsdsgdgfdgd`);
    /*
    (<any>window).FirebasePlugin.verifyPhoneNumber(function(credential) {
      const data: any = credential;
      console.log(data);
      const token = data.verificationId;
      if(data.instantVerification){
        console.log("instantVerification");
      }else{
        console.log("Not instantVerification");
      }
      router.navigateByUrl(`/login-code/${page}/${phone}/${token}`);
    }, function(error) {
      console.error("Failed to verify phone number: " + JSON.stringify(error));
    }, phone, 60);
    */
  }

}
