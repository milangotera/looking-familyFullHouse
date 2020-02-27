import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook/ngx';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileData: any = {
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

  disabled: boolean = true;

  token: string;

  constructor(
    public api: ApiService,
    private router: Router,
    private storage: Storage,
    private toast: ToastController,
    private facebook: Facebook
  ) { }

  ngOnInit() {
  }

  async showToas(message) {
    const toastMessage = await this.toast.create({
      header: `Hola ${this.profileData.firstname}`,
      message: message,
      duration: 3000,
      cssClass: 'app-toast-message'
    });
    toastMessage.present();
  }

  ionViewWillEnter(){

    this.disabled = true;

    this.storage.get('family_token').then( token => {
      this.token = token;
      this.api.getProfile(token).then( (res:any) =>{
        this.profileData = res.data;
        if(!res.data.profile){
          this.profileData.profile = 'assets/img/profile.png';
        }
        this.disabled = false;
      }).catch( (err:any) =>{
        this.disabled = false;
        this.storage.set('family_token', null);
        this.router.navigateByUrl(`/login`);
      });
    });

  }

  updateData(){
    this.disabled = true;
    this.api.putProfile(
      this.token,
      this.profileData
    ).then( (res:any) =>{
      this.router.navigateByUrl(`/spash/0/profile`);
      this.disabled = false;
    }).catch( (err:any) =>{
      this.disabled = false;
      console.log(err)
      if(err.status == 403){
        this.showToas('Todos los campos son necesarios para contnuar');
      }else{
        this.storage.set('family_token', null);
        this.router.navigateByUrl(`/login`);
      }
    });
  }

  removeData(){
    this.disabled = true;
    this.api.putProfile(
      this.token,
      this.profileData
    ).then( (res:any) =>{
      this.disabled = false;
      this.storage.set('family_token', null);
      this.router.navigateByUrl(`/login`);
    }).catch( (err:any) =>{
      this.disabled = false;
      this.storage.set('family_token', null);
      this.router.navigateByUrl(`/login`);
    });
  }

  loginFacebook(){
    this.disabled = true;
    this.facebook.login(['public_profile', 'email'])
    .then(rta => {
      if(rta.status == 'connected'){
        this.getInfo();
      }else{
        this.disabled = false;
        this.showToas('Parece que no se pudo hacer la conexion con tu facebook')
      }
    })
    .catch(error =>{
      this.disabled = false;
    });
  }

  getInfo(){
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
    .then(data=>{
      this.disabled = false;
      this.profileData.firstname = data.first_name;
      this.profileData.lastname = data.last_name;
      this.profileData.email = data.email;
      this.profileData.profile = data.picture.data.url;
      this.profileData.facebook = data.id;
    })
    .catch(error =>{
      this.disabled = false;
    });
  }

}
