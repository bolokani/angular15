import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCoreModule } from "./system/services/mat-core/mat-core.module";
import { SubstrPipe } from './system/services/pipe/substr.pipe';
import { RecaptchaModule } from 'ng-recaptcha';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatStepperModule } from '@angular/material/stepper';

import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { HeaderComponent } from './system/main/header/header.component';
import { FooterComponent } from './system/main/footer/footer.component';
import { HomeComponent } from './system/home/home.component';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './system/about/about.component';
import { ServerService } from './system/services/server/server.service';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginComponent } from './system/register/login/login.component';
import { SignupComponent } from './system/register/signup/signup.component';
import { Pages404Component } from './system/main/pages404/pages404.component';
import { NgxCurrencyModule } from "ngx-currency";
import { RuleComponent } from './system/register/rule/rule.component';
import { Header2Component } from './system/main/header2/header2.component';
import { MessageService } from './system/services/message/message.service';
import { ProfileMenuComponent } from './system/personal/profile-menu/profile-menu.component';
import { Home2Component } from './system/home2/home2.component';
import { ProfileComponent } from './system/personal/profile/profile.component';
import { PersonalInfoComponent } from './system/personal/personal-info/personal-info.component';
import { PersonalInfoDetaileComponent } from './system/personal/personal-info-detaile/personal-info-detaile.component';
import { MenuComponent } from './system/main/menu/menu.component';
import { CompanyListComponent } from './system/personal/company-list/company-list.component';
import { CompanyDetaileComponent } from './system/personal/company-detaile/company-detaile.component';
import { CompanyDetaile2Component } from './system/personal/company-detaile2/company-detaile2.component';

export const customCurrencyMaskConfig = {
  align: "auto",
  allowNegative: true,
  allowZero: true,
  decimal: ".",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: ",",
  nullable: true
};


const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "", component: HomeComponent, children: [
      { path: "", component: Home2Component },
      {
        path: 'profile', component: ProfileComponent, children: [
          { path: "info", component: PersonalInfoComponent },
          { path: "my-company", component: CompanyListComponent },
          { path: "company-detaile/:id", component: CompanyDetaileComponent },
        ]
      },
      { path: "about/:title", component: AboutComponent },
    ]
  },

  { path: "signup", component: SignupComponent },
  { path: "not-found", component: Pages404Component },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    SubstrPipe,
    Pages404Component,
    RuleComponent, Home2Component,
    Header2Component, ProfileComponent
    , ProfileMenuComponent
    , PersonalInfoComponent, PersonalInfoDetaileComponent
    , MenuComponent, CompanyListComponent, CompanyDetaileComponent, CompanyDetaile2Component
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' })
    , RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }), HttpClientModule, MatSnackBarModule, MatTableModule
    , FormsModule, ReactiveFormsModule, MatDialogModule, BrowserAnimationsModule
    , MatIconModule, MatRadioModule, DragDropModule, MatProgressBarModule
    , MatCheckboxModule
    , MatDatepickerModule, FlexLayoutModule, InfiniteScrollModule, MatStepperModule
    , MatCoreModule, MatSlideToggleModule, NgxCurrencyModule.forRoot(customCurrencyMaskConfig), RecaptchaModule
  ],
  entryComponents: [MessageService],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
