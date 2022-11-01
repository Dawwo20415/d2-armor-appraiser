import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { HttpClientModule }             from '@angular/common/http';
import { ReactiveFormsModule }          from '@angular/forms'

import { AppRoutingModule }             from './app-routing.module';
import { AppComponent }                 from './app.component';
import { BAuthRedirectComponent }       from './b-auth-redirect/b-auth-redirect.component';

import { BrowserAnimationsModule }      from '@angular/platform-browser/animations';
import { MatToolbarModule }             from '@angular/material/toolbar';
import { MatIconModule }                from '@angular/material/icon';
import { MatCardModule}                 from '@angular/material/card';
import { MatButtonModule }              from '@angular/material/button';
import { MatGridListModule }            from '@angular/material/grid-list'; 
import { MatButtonToggleModule }        from '@angular/material/button-toggle';
import { MatSliderModule }              from '@angular/material/slider';
import { MatTableModule }               from '@angular/material/table';

import { FlexLayoutModule }             from '@angular/flex-layout';
import { DisplayComponent }             from './display/display.component';
import { CharacterSelectComponent }     from './homepage-cards/character-select/character-select.component';
import { AlgorithmParametersComponent } from './homepage-cards/algorithm-parameters/algorithm-parameters.component';
import { ScoreFilterComponent }         from './homepage-cards/score-filter/score-filter.component';
import { ArmorDataDisplayComponent }    from './homepage-cards/armor-data-display/armor-data-display.component';
import { LoginRequestComponent }        from './login-request/login-request.component';

import { ClipboardModule }              from '@angular/cdk/clipboard';
import { DevControllCardComponent } from './homepage-cards/dev-controll-card/dev-controll-card.component';


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

    FlexLayoutModule,
    ClipboardModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
