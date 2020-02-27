import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public modal: boolean = false;

  profileData: any = {
    id: null,
    firstname: null,
    lastname: null,
    phone: null,
    premium: false,
    member: false,
    status: false,
    signin: false,
    profile: null,
  };

  token: string;

  disabled: boolean = true;

  constructor(
    public api: ApiService,
    private storage: Storage,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('family_token').then( token => {
      this.token = token;
      this.api.getProfile(token).then( (res:any) =>{
        this.profileData = res.data;
        this.disabled = false;
      }).catch( (err:any) =>{
        this.disabled = false;
        this.storage.set('family_token', null);
        this.router.navigateByUrl(`/login`);
      });
    });
  }

  tooggleModal(modal){
    this.modal = modal;
  }

  payData(){
    let url = `http://pagos.familyfullhouse.com`;
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    form.setAttribute("target", '_blank');

    let id = document.createElement('input');
    id.type = 'hidden';
    id.name = 'id';
    id.value = this.profileData.id;
    form.appendChild(id);

    let premium = document.createElement('input');
    premium.type = 'hidden';
    premium.name = 'premium';
    premium.value = this.profileData.premium;
    form.appendChild(premium);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

}
