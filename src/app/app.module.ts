import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { HttpClientModule }             from '@angular/common/http';
import { ReactiveFormsModule }          from '@angular/forms'

// Components and Pages
import { AppRoutingModule }             from './app-routing.module';
import { AppComponent }                 from './app.component';
import { BAuthRedirectComponent }       from './b-auth-redirect/b-auth-redirect.component';
import { LoginRequestComponent }        from './login-request/login-request.component';
import { DisplayComponent }             from './display/display.component';
import { CharacterSelectComponent }     from './homepage-cards/character-select/character-select.component';
import { AlgorithmParametersComponent } from './homepage-cards/algorithm-parameters/algorithm-parameters.component';
import { ScoreFilterComponent }         from './homepage-cards/score-filter/score-filter.component';
import { ArmorDataDisplayComponent }    from './homepage-cards/armor-data-display/armor-data-display.component';
import { DevControllCardComponent }     from './homepage-cards/dev-controll-card/dev-controll-card.component';

import { BrowserAnimationsModule }      from '@angular/platform-browser/animations';
import { MatToolbarModule }             from '@angular/material/toolbar';
import { MatIconModule }                from '@angular/material/icon';
import { MatCardModule}                 from '@angular/material/card';
import { MatButtonModule }              from '@angular/material/button';
import { MatGridListModule }            from '@angular/material/grid-list'; 
import { MatButtonToggleModule }        from '@angular/material/button-toggle';
import { MatSliderModule }              from '@angular/material/slider';
import { MatTableModule }               from '@angular/material/table';
import { MatCheckboxModule }            from '@angular/material/checkbox';
import { MatSidenavModule }             from '@angular/material/sidenav';

import { FlexLayoutModule }             from '@angular/flex-layout';
import { ClipboardModule }              from '@angular/cdk/clipboard';



@NgModule({
  declarations: [
    AppComponent,
    BAuthRedirectComponent,
    DisplayComponent,
    CharacterSelectComponent,
    AlgorithmParametersComponent,
    ScoreFilterComponent,
    ArmorDataDisplayComponent,
    LoginRequestComponent,
    DevControllCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatTableModule,
    MatCheckboxModule,
    MatSidenavModule,

    FlexLayoutModule,
    ClipboardModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
