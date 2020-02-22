import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CountriesPage } from '../../modal/countries/countries.page';
import { ApiService } from '../../services/api.service';

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

  constructor(
    public modalController: ModalController,
    public api: ApiService
  ) { }

  ngOnInit() {
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

}
