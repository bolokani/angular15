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
import { HeaderComponent } from './system/header/header.component';
import { FooterComponent } from './system/footer/footer.component';
import { HomeComponent } from './system/home/home.component';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './system/about/about.component';
import { ContactComponent } from './system/contact/contact.component';
import { ServerService } from './system/services/server/server.service';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContactDetaileComponent } from './system/contact-detaile/contact-detaile.component';
import { LoginComponent } from './system/register/login/login.component';
import { SignupComponent } from './system/register/signup/signup.component';
import { Pages404Component } from './system/pages404/pages404.component';
import { NgxCurrencyModule } from "ngx-currency";
import { RuleComponent } from './system/register/rule/rule.component';
import { Header2Component } from './system/header2/header2.component';
import { MessageService } from './system/services/message/message.service';
import { ProfileComponent } from './system/profile/profile.component';
import { ContractListComponent } from './system/contract-list/contract-list.component';
import { ContractCommentComponent } from './system/contract-comment/contract-comment.component';
import { ContractProcessComponent } from './system/contract-process/contract-process.component';
import { ContractInvoiceComponent } from './system/contract-invoice/contract-invoice.component';
import { ContractInvoiceAttachmentComponent } from './system/contract-invoice-attachment/contract-invoice-attachment.component';
import { PhomeComponent } from './system/phome/phome.component';

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
  { path: "", component: HomeComponent },
  {
    path: "phome", component: PhomeComponent, children: [
      { path: 'profile', component: ProfileComponent },
      { path: "contract", component: ContractListComponent },
    ]
  },
  { path: "about", component: AboutComponent },
  { path: "contact/:title", component: ContactComponent },
  { path: "login", component: LoginComponent },
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
    ContactComponent,
    ContactDetaileComponent,
    LoginComponent,
    SignupComponent,
    SubstrPipe,
    Pages404Component,
    RuleComponent,
    Header2Component, ProfileComponent, ContractListComponent, ContractCommentComponent, ContractProcessComponent, ContractInvoiceComponent, ContractInvoiceAttachmentComponent, PhomeComponent
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
