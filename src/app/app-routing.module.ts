import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'spash/0/home', pathMatch: 'full' },
  {
    path: 'spash/:page/:phone',
    loadChildren: () => import('./pages/spash/spash.module').then( m => m.SpashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-code/:page/:phone/:token',
    loadChildren: () => import('./pages/login-code/login-code.module').then( m => m.LoginCodePageModule)
  },
  {
    path: 'panel',
    loadChildren: () => import('./pages/panel/panel.module').then( m => m.PanelPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
