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
import { ContactDetaileComponent } from './system/personal/personal-contact-detaile/contact-detaile.component';
import { LoginComponent } from './system/register/login/login.component';
import { SignupComponent } from './system/register/signup/signup.component';
import { Pages404Component } from './system/main/pages404/pages404.component';
import { NgxCurrencyModule } from "ngx-currency";
import { RuleComponent } from './system/register/rule/rule.component';
import { Header2Component } from './system/main/header2/header2.component';
import { MessageService } from './system/services/message/message.service';
import { ProfileMenuComponent } from './system/personal/profile-menu/profile-menu.component';
import { ContractCommentComponent } from './system/personal/contract-comment/contract-comment.component';
import { ContractProcessComponent } from './system/personal/contract-process/contract-process.component';
import { ContractInvoiceComponent } from './system/personal/contract-invoice/contract-invoice.component';
import { ContractInvoiceAttachmentComponent } from './system/contract-invoice-attachment/contract-invoice-attachment.component';
import { Home2Component } from './system/home2/home2.component';
import { InvoicePrintComponent } from './system/invoice-print/invoice-print.component';
import { InvoicePrintCellphoneComponent } from './system/invoice-print-cellphone/invoice-print-cellphone.component';
import { ProfileComponent } from './system/personal/profile/profile.component';
import { CustomsPrintComponent } from './system/customs-print/customs-print.component';
import { PersonalInfoComponent } from './system/personal/personal-info/personal-info.component';
import { PersonalInfoDetaileComponent } from './system/personal/personal-info-detaile/personal-info-detaile.component';
import { PrsonalContractComponent } from './system/personal/prsonal-contract/prsonal-contract.component';
import { MenuComponent } from './system/main/menu/menu.component';
import { PersonalInvoice2Component } from './system/personal/personal-invoice2/personal-invoice2.component';
import { PersonalInvoice2CellphoneComponent } from './system/personal/personal-invoice2-cellphone/personal-invoice2-cellphone.component';
import { ContractInvoice3Component } from './system/personal/contract-invoice3/contract-invoice3.component';
import { ContractInvoice3CellphoneComponent } from './system/personal/contract-invoice3-cellphone/contract-invoice3-cellphone.component';
import { ContractCostInvoice2Component } from './system/personal/contract-cost-invoice2/contract-cost-invoice2.component';
import { ContractImageComponent } from './system/personal/contract-image/contract-image.component';

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
  { path: "invoice-contract2/:id", component: ContractCostInvoice2Component },


  {
    path: "", component: HomeComponent, children: [
      { path: "", component: Home2Component },
      {
        path: 'profile', component: ProfileComponent, children: [
          { path: "info", component: PersonalInfoComponent },
          { path: "contract", component: PrsonalContractComponent },
          { path: "contract-detaile/:id", component: ContactDetaileComponent },
          { path: "contract-process/:id", component: ContractProcessComponent },
          { path: "contract-comment/:id", component: ContractCommentComponent },
          { path: "contract-invoice/:id", component: ContractInvoiceComponent },
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
    ContactDetaileComponent,
    LoginComponent,
    SignupComponent,
    SubstrPipe,
    Pages404Component,
    RuleComponent, Home2Component,
    Header2Component, ProfileComponent, ContractCommentComponent
    , ContractProcessComponent, ContractInvoiceComponent, ContractInvoiceAttachmentComponent
    , InvoicePrintComponent, InvoicePrintCellphoneComponent, ProfileMenuComponent, CustomsPrintComponent
    , PersonalInfoComponent, PersonalInfoDetaileComponent, PrsonalContractComponent
    , MenuComponent, PersonalInvoice2Component, PersonalInvoice2CellphoneComponent
    , ContractInvoice3Component, ContractInvoice3CellphoneComponent, ContractCostInvoice2Component, ContractImageComponent
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
