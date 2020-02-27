import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {

  constructor(
    private router: Router,
    private platform: Platform
  ){
    this.platform = platform;
  }

  ngOnInit() {}

  goPage(page){
    this.router.navigateByUrl(page);
  }

}
