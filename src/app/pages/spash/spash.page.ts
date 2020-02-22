import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-spash',
  templateUrl: './spash.page.html',
  styleUrls: ['./spash.page.scss'],
})
export class SpashPage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute
  ){

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    const page = this.activatedRoute.snapshot.paramMap.get('page');
    setTimeout( () => {
      this.storage.get('family_token').then((data) => {
        if(!data)
          this.router.navigateByUrl('/login');
        else{
          this.router.navigateByUrl(`/${page}`);
        }
      });
    }, 3000);
  }

}
