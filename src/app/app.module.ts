import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageTemplateComponent } from './page-template/page-template.component';
import { BAuthRedirectComponent } from './b-auth-redirect/b-auth-redirect.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MainPageComponent } from './main-page/main-page.component';
import { DisplayComponent } from './display/display.component';
import { CharacterSelectComponent } from './homepage-cards/character-select/character-select.component';
import { AlgorithmParametersComponent } from './homepage-cards/algorithm-parameters/algorithm-parameters.component';
import { ScoreFilterComponent } from './homepage-cards/score-filter/score-filter.component';
import { ArmorDataDisplayComponent } from './homepage-cards/armor-data-display/armor-data-display.component';


@NgModule({
  declarations: [
    AppComponent,
    PageTemplateComponent,
    BAuthRedirectComponent,
    MainPageComponent,
    DisplayComponent,
    CharacterSelectComponent,
    AlgorithmParametersComponent,
    ScoreFilterComponent,
    ArmorDataDisplayComponent
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

    FlexLayoutModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
