import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCoreModule } from "./pages/services/mat-core/mat-core.module";
import { SubstrPipe } from './pages/services/pipe/substr.pipe';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { BaseRouteReuseStrategy, DefaultRouteReuseStrategy } from './base-route-reuse-strategy.service';
import { CustomeRouteReuseStrategy } from './custome-route-reuse-strategy.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/main/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ServerService } from './pages/services/server/server.service';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FooterComponent } from './pages/main/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Header2Component } from './pages/main/header2/header2.component';
import { MessageService } from './pages/services/message/message.service';
import { Page404Component } from './pages/page404/page404.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderBascketComponent } from './pages/main/header-bascket/header-bascket.component';
import { AllGoodsListComponent } from './pages/all-goods-list/all-goods-list.component';
import { AllGoodsDetaileComponent } from './pages/all-goods-detaile/all-goods-detaile.component';
import { AllGoodsDetaileImagesComponent } from './pages/all-goods-detaile-images/all-goods-detaile-images.component';
import { MatStepperModule } from '@angular/material/stepper';

import { ShopProductComponent } from './pages/shop/shop-product/shop-product.component';
import { ShopProductDetaileComponent } from './pages/shop/shop-product-detaile/shop-product-detaile.component';
import { ShopOrderComponent } from './pages/shop/shop-bascket/shop-order/shop-order.component';
import { ShopStepperComponent } from './pages/shop/shop-bascket/shop-stepper/shop-stepper.component';
import { ShopBascketAddressComponent } from './pages/shop/shop-bascket/shop-bascket-address/shop-bascket-address.component';
import { ShopBascketPegiriComponent } from './pages/shop/shop-bascket/shop-bascket-pegiri/shop-bascket-pegiri.component';
import { Home2Component } from './pages/home2/home2.component';
import { ProfileMenuComponent } from './pages/profile/profile-menu/profile-menu.component';
import { AllGoodsGroupComponent } from './pages/all-goods-group/all-goods-group.component';
import { ContentDetaileComponent } from './pages/content-detaile/content-detaile.component';
import { QuestionComponent } from './pages/question/question.component';
import { ProfileComponent } from './pages/personal/profile/profile.component';
import { PersonalHomeComponent } from './pages/personal/personal-home/personal-home.component';
import { PersonalInfoComponent } from './pages/personal/personal-info/personal-info.component';
import { PersonalOrdersComponent } from './pages/personal/personal-orders/personal-orders.component';
import { PersonalInfoDetaileComponent } from './pages/personal/personal-info-detaile/personal-info-detaile.component';
import { PersonalAddressComponent } from './pages/personal/personal-address/personal-address.component';
import { ShopBascketSelectAddressComponent } from './pages/shop/shop-bascket/shop-bascket-select-address/shop-bascket-select-address.component';
import { PersonalOrdersDetaileComponent } from './pages/personal/personal-orders-detaile/personal-orders-detaile.component';
import { PersonalOrdersInvoiceComponent } from './pages/personal/personal-orders-invoice/personal-orders-invoice.component';
import { GoodsCatePropertyCommentComponent } from './pages/goods-cate-property-comment/goods-cate-property-comment.component';

/*
import { ShopCartComponent } from './pages/shop/shop-bascket/shop-cart/shop-cart.component';
import { ShopCateComponent } from './pages/shop/shop-cate/shop-cate.component';
import { ShopSuppliersComponent } from './pages/shop/shop-suppliers/shop-suppliers-list/shop-suppliers.component';
*/


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'orders-invoice/:id', component: PersonalOrdersInvoiceComponent },
  {
    path: "", component: HomeComponent, children: [
      { path: "", component: Home2Component },
      { path: 'category/:id/:title', component: AllGoodsListComponent },
      { path: 'group/:title', component: AllGoodsGroupComponent },
      { path: 'content/:id/:title', component: ContentDetaileComponent },
      { path: 'questions/:title', component: QuestionComponent },
      {
        path: 'profile', component: ProfileComponent, children: [
          { path: '', component: PersonalHomeComponent },
          { path: 'info', component: PersonalInfoComponent },
          { path: 'orders', component: PersonalOrdersComponent },
          { path: 'orders-detaile/:id', component: PersonalOrdersDetaileComponent },
        ]
      },
      {
        path: "shopping", component: ShopStepperComponent, children: [
          { path: "bascket", component: ShopOrderComponent },
          { path: "address", component: ShopBascketAddressComponent },
          { path: "tracking", component: ShopBascketPegiriComponent },
        ]
      },
      { path: ':productID/:title', component: AllGoodsDetaileComponent },

    ]
  },
  { path: '**', component: Page404Component },
  { path: 'not-found', component: Page404Component },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SubstrPipe,
    FooterComponent,
    LoginComponent,
    Header2Component,
    Page404Component, ShopBascketPegiriComponent, ShopBascketAddressComponent,
    HeaderBascketComponent, AllGoodsListComponent, AllGoodsDetaileComponent, AllGoodsDetaileImagesComponent
    , ShopProductComponent, ShopProductDetaileComponent, ShopOrderComponent, ShopStepperComponent, Home2Component, ProfileMenuComponent, AllGoodsGroupComponent, ContentDetaileComponent, QuestionComponent, ProfileComponent, PersonalHomeComponent, PersonalInfoComponent, PersonalOrdersComponent, PersonalInfoDetaileComponent, PersonalAddressComponent, ShopBascketSelectAddressComponent, PersonalOrdersDetaileComponent, PersonalOrdersInvoiceComponent, GoodsCatePropertyCommentComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' })
    , RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }), HttpClientModule, MatSnackBarModule, MatTableModule
    , FormsModule, ReactiveFormsModule, MatDialogModule, BrowserAnimationsModule
    , MatIconModule, MatRadioModule, DragDropModule, MatProgressBarModule
    , MatCheckboxModule, MatStepperModule
    , MatDatepickerModule, MatSidenavModule, MatTreeModule, MatBadgeModule
    , MatCoreModule, MatSlideToggleModule, MatBottomSheetModule, InfiniteScrollModule, CdkAccordionModule

  ],
  entryComponents: [],
  providers: [ServerService, MessageService,
    { provide: RouteReuseStrategy, useClass: CustomeRouteReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
