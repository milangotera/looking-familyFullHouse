import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-spash',
  templateUrl: './spash.page.html',
  styleUrls: ['./spash.page.scss'],
})
export class SpashPage implements OnInit {

  page: string;
  phone: string;

  constructor(
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    public api: ApiService,
  ){

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.page = this.activatedRoute.snapshot.paramMap.get('page');
    this.phone = this.activatedRoute.snapshot.paramMap.get('phone');
    if(this.page == '0'){
      this.storage.get('family_token').then( token => {
        if(token){
          this.api.getProfile(token).then( (res:any) =>{
            setTimeout( () => {
              this.storage.set('family_panel', null).then( panel => {
                this.router.navigateByUrl(`/${this.phone}`);
              });
            }, 2000);
          }).catch( (err:any) =>{
            setTimeout( () => {
              this.storage.set('family_token', null);
              this.storage.set('family_panel', null);
              this.router.navigateByUrl(`/login`);
            }, 2000);
          });
        }else{
          setTimeout( () => {
            this.router.navigateByUrl(`/login`); 
          }, 2000);
        }
      });
    }
    if(this.page == "1"){
      console.log("LOGIN");
      this.login();
    }
    if(this.page == "2"){
      console.log("SIGNIN");
      this.signin();
    }
  }

  login(){
    this.api.loginPhone(this.phone).then( (res:any) =>{
      this.storage.set('family_token', res.token).then( (family_token:any) =>{
        this.storage.set('family_data', null);
        this.router.navigateByUrl(`/home`);
      });
    }).catch( (err:any) =>{
      this.storage.set('family_data', null);
      this.router.navigateByUrl(`/login`);
    });
  }

  signin(){
    this.storage.get('family_data').then((data) => {
      this.api.signin({ phone: data.phone, firstname: data.firstname, lastname: data.lastname }).then( (res:any) =>{
        this.storage.set('family_data', null);
        this.login();
      }).catch( (err:any) =>{
        this.storage.set('family_data', null);
        this.router.navigateByUrl(`/login`);
      });
    });
  }

}
