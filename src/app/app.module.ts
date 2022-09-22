import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageTemplateComponent } from './page-template/page-template.component';
import { BAuthRedirectComponent } from './b-auth-redirect/b-auth-redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTemplateComponent,
    BAuthRedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
