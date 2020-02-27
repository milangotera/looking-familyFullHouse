import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';

import { CountriesPageModule } from './modal/countries/countries.module';
import { ChangePageModule } from './modal/change/change.module';
import { InvitePageModule } from './modal/invite/invite.module';
import { ShowPageModule } from './modal/show/show.module';

import { HttpClientModule } from '@angular/common/http';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { SharedModule } from './shared/shared/shared.module';

import * as firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook/ngx';

firebase.initializeApp({
  apiKey: "AIzaSyANfXm92wcDvYMxxQClRiarF7Dgj4pVN_E",
  authDomain: "looking-apps.firebaseapp.com",
  databaseURL: "https://looking-apps.firebaseio.com",
  projectId: "looking-apps",
  storageBucket: "looking-apps.appspot.com",
  messagingSenderId: "600798268480",
  appId: "1:600798268480:web:17cd0cca21de9dc18c63a5",
  measurementId: "G-P2WTNJ5W6Z"
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    CountriesPageModule,
    ChangePageModule,
    InvitePageModule,
    ShowPageModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenOrientation,
    Facebook,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
