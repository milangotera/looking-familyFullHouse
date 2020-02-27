import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {

  position: number;

  disabled: boolean;

  inviteData: any = {
    firstname: null,
    lastname: null,
    phone: null,
  };

  errorData: any = {
    firstname: null,
    lastname: null,
    phone: null,
  };

  token: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public api: ApiService,
    private storage: Storage,
    private toast: ToastController,
  ){
    this.disabled = true;
    this.storage.get('family_token').then( token => {
      this.disabled = false;
      this.token = token;
    });
  }

  ngOnInit() {
    this.position = this.navParams.data.position;
  }

  async showToas(message) {
    const toastMessage = await this.toast.create({
      message: message,
      duration: 3000,
      cssClass: 'app-toast-message'
    });
    toastMessage.present();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  sendData() {
    let error: boolean = false;
    this.errorData.firstname = null;
    this.errorData.lastname = null;
    this.errorData.phone = null;
    this.disabled = true;
    this.api.invite(this.token, this.inviteData).then( (res:any) => {
        this.closeModal();
        this.disabled = false;
      }).catch( (err:any) => {
        this.disabled = false;
        this.errorData = err.error.errors;
        this.showToas('Parece que no se pudo guardar tu invitado');
    });
  }

}
