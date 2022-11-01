import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BAuthRedirectComponent } from './b-auth-redirect/b-auth-redirect.component';
import { DisplayComponent } from './display/display.component';
import { LoginRequestComponent } from './login-request/login-request.component';

const routes: Routes = [
  { path: '', component: DisplayComponent },
  { path: 'login_request', component: LoginRequestComponent },
  { path: 'confirm_auth', component: BAuthRedirectComponent},

  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
