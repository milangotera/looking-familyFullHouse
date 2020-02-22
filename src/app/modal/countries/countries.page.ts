import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {

  zoneSelect : any = {
    "flag": "https://restcountries.eu/data/col.svg",
    "cioc": "COL",
    "name": "Colombia",
    "callingCodes": ["57"]
  };

  zones: any = [];

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public api: ApiService
  ){

  }

  ngOnInit() {
    this.zoneSelect = this.navParams.data.zoneSelect;
    this.getCountries();
  }

  async closeModal(zoneSelect) {
    await this.modalController.dismiss(zoneSelect);
  }

  getCountries() {
    this.api.getCountries().then( res => {
      this.zones = res;
    });
  }

}
