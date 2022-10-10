import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTemplateComponent } from './page-template/page-template.component';
import { BAuthRedirectComponent } from './b-auth-redirect/b-auth-redirect.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DisplayComponent } from './display/display.component';

const routes: Routes = [
  { path: '', component: PageTemplateComponent },
  { path: 'confirm_auth', component: BAuthRedirectComponent},
  { path: 'homepage_test', component: MainPageComponent},
  { path: 'display', component: DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
