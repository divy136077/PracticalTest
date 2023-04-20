import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./non-auth/login/login.module').then(x => x.LoginviewModule) },
  // { path: 'signup', loadChildren: () => import('./non-auth/signup/signup-routing.module').then(x => x.SignupRoutingModule) },
  { path: 'signup', loadChildren: () => import('./non-auth/signup/signup.module').then(x => x.SignupModule) },
  { path: 'chat', loadChildren: () => import('./non-auth/chat/chat.module').then(x => x.ChatModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
