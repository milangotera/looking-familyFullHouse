import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController , ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { CountriesPage } from '../../modal/countries/countries.page';
import { CodePage } from '../../modal/code/code.page';

import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';

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
    public helper: HelperService,
    public alert : AlertController,
    public toast: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  async welcomeToast() {
    const toast = await this.toast.create({
      message: 'Bienvenido a tu family panel',
      duration: 2000
    });
    toast.present();
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
      /*
      inputs: [
        {
          name: 'phone',
          type: 'text',
          value: `+${this.zoneSelect.callingCodes[0]}${this.phone}`,
          disabled: true
        },
        {
          name: 'firstname',
          type: 'text',
          value: this.firstname,
          placeholder: 'Nombre'
        },
        {
          name: 'lastname',
          type: 'text',
          value: this.lastname,
          placeholder: 'Apellido',
        },
      ],
      */
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
          handler: () => {
            this.modalCode(2);
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
      if(res.status == 200){
        this.welcomeConfirm();
      }else if(res.status == 403){
        this.modalCode(1);
      }
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

  async modalCode(opcion) {
    const modal = await this.modalController.create({
      cssClass: 'app-modal-countries',
      component: CodePage,
      componentProps: {
        "zoneSelect": this.zoneSelect,
        "firstname": this.firstname,
        "lastname": this.lastname,
        "opcion": opcion,
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

}
