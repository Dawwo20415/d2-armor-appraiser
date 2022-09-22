import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTemplateComponent } from './page-template/page-template.component';
import { BAuthRedirectComponent } from './b-auth-redirect/b-auth-redirect.component';

const routes: Routes = [
  { path: '', component: PageTemplateComponent },
  { path: 'confirm_auth', component: BAuthRedirectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
