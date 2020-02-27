import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { InvitePage } from '../../modal/invite/invite.page';
import { ShowPage } from '../../modal/show/show.page';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {

  family: any = [];
  disabled: boolean = true;
  token: string;

  constructor(
    public api: ApiService,
    private router: Router,
    private storage: Storage,
    private toast: ToastController,
    public modalController: ModalController,
  ){
    // DATOS PERFIL
    this.family[0] = this.setData(null);
    // DATOS INVITADO IZQUIERDA
    this.family[1] = this.setData(null);
    this.family[3] = this.setData(null);
    this.family[4] = this.setData(null);
    // DATOS INVITADO DERECHA
    this.family[2] = this.setData(null);
    this.family[5] = this.setData(null);
    this.family[6] = this.setData(null);
  }

  ngOnInit() {
  }

  ionViewWillEnter(){

    this.disabled = true;

    this.storage.get('family_token').then( token => {
      this.token = token;
      this.getFamily({ danger: false });
    });

  }

  getFamily(data: any){
    this.api.family(this.token).then( (res:any) =>{
      let cicle: number = 0;
      this.disabled = false;
      this.family[0] = this.setData(res);
      // DATOS INVITADO DERECHA
      if(typeof res.children[0] != 'undefined'){
        this.family[1] = this.setData(res.children[0]);
        if(this.family[1].status){
          cicle++;
        }
        if(typeof res.children[0].children[0] != 'undefined'){
          this.family[3] = this.setData(res.children[0].children[0]);
        }
        if(typeof res.children[0].children[1] != 'undefined'){
          this.family[4] = this.setData(res.children[0].children[1]);
        }
      }
      // DATOS INVITADO DERECHA
      if(typeof res.children[1] != 'undefined'){
        this.family[2] = this.setData(res.children[1]);
        if(this.family[2].status){
          cicle++;
        }
        if(typeof res.children[1].children[0] != 'undefined'){
          this.family[5] = this.setData(res.children[1].children[0]);
        }
        if(typeof res.children[1].children[1] != 'undefined'){
          this.family[6] = this.setData(res.children[1].children[1]);
        }
      }

      console.log(data);
      if(cicle == 2 && this.family[0].premium == false){
        if(data.danger){
          this.dangerData();
        }
      }

    }).catch( (err:any) =>{
      this.storage.set('family_token', null);
      this.router.navigateByUrl(`/login`);
    });
  }

  dangerData() {
    this.disabled = true;
    this.api.inviteDanger(this.token, this.family[0].id).then( (res:any) => {
        this.disabled = false;
        this.family[0].status = false;
        this.showToas(`Has terminado un siclo y debes ser activado por tu anfitrion para poder realizar cambios`);
      }).catch( (err:any) => {
        this.disabled = false;
    });
  }

  showProfile(id){
    let error: boolean = false;
    if(!this.family[0].member){
      error = true;
      this.showToas(`Lo siento, pero debes ir a home y pagar tu membrecia para contnuar disfrutando el servicio`);
    }
    else if(!this.family[0].status){
      error = true;
      this.showToas(`Lo siento, debes ser activado por tu anfitrion para poder realizar cambios`);
    }
    if(!error){
      if(id == 1 || id == 2){
        if(this.family[id].id){
          this.modalShow(this.family[id], 1)
        }
        else{
          this.modalInvite();
        }
      }
      else{
        if(this.family[id].id){
          this.modalShow(this.family[id], 2)
        }
        else{
          this.showToas(`Lo siento, pero en este nivel solo pueden aplicarse cambios por tus invitados`);
        }
      }
    }
  }

  async showToas(message) {
    const toastMessage = await this.toast.create({
      header: `Hola ${this.family[0].firstname}`,
      message: message,
      duration: 3000,
      cssClass: 'app-toast-message'
    });
    toastMessage.present();
  }

  setData(data){
    let set_data : any = {
      id: null,
      firstname: 'Invitar',
      lastname: null,
      phone: null,
      premium: false,
      member: false,
      status: false,
      signin: false,
      profile: 'assets/img/profile.png',
    };
    if(data){
      set_data = data;
      if(!data.profile)
        set_data.profile = 'assets/img/profile.png';
    }
    return set_data;
  }

  async modalInvite() {
    const modal = await this.modalController.create({
      cssClass: 'app-modal-countries',
      component: InvitePage,
      componentProps: {
        "data": null,
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      this.getFamily(dataReturned.data);
    });
 
    return await modal.present();
  }

  async modalShow(inviteData, position) {
    const modal = await this.modalController.create({
      cssClass: 'app-modal-countries',
      component: ShowPage,
      componentProps: {
        "inviteData": inviteData,
        "position": position
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      this.getFamily(dataReturned.data);
    });
 
    return await modal.present();
  }

}
