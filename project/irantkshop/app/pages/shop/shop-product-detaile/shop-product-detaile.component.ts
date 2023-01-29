import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServerService } from '../../services/server/server.service';
import { MessageService } from '../../services/message/message.service';


@Component({
  selector: 'app-shop-product-detaile',
  templateUrl: './shop-product-detaile.component.html',
  styleUrls: ['./shop-product-detaile.component.css']
})
export class ShopProductDetaileComponent implements OnInit, OnDestroy {
  public server: string = this.serverService.get_server();
  public server2: string = this.serverService.get_server2();
  public status: any = JSON.parse(<any>localStorage.getItem('status'));
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public isOnline: any;
  public loading = false;
  public subscription: Subscription;
  public id: number;
  public title: string;
  public cate2_title: string;
  public user_moshaver: string;
  public user_logo: string;
  public user_site: string;
  public goods_war: string;
  public goods_stime: string;
  public list_specification: any = [];
  public goods_price: number;
  public goods_discount: number;
  public goods_price2: number;
  public goods_comment: any;
  public site1: string; public site2: string; public site3: string; public site4: string; public site5: string;
  public img1: string; public img2: string; public img3: string; public img4: string; public img5: string;
  public username: any;
  public user_id: any;


  constructor(
    public serverService: ServerService
    , public messageService: MessageService
    , public router: Router, public matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dialog_data: any
    , public dialogRef: MatDialogRef<ShopProductDetaileComponent>) {
    if (this.user_id) {
      this.id = this.dialog_data.id;
    }

  }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    if (!this.user_id) {
      var code = Math.floor(Math.random() * 99999999999999);
      this.user_id = localStorage.setItem('user_id', JSON.stringify(code));
    }//end if
    this.user_id = localStorage.getItem('user_id');
    this.get_product();
    this.get_specification();
  }//end ngOnInit

  get_product() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'product_get_with_id', { id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.title = res['result'][0].product_goods_title;
          this.cate2_title = res['result'][0].product_cate2_title;
          this.user_moshaver = res['result'][0].user_moshaver;
          this.user_logo = res['result'][0].user_logo;
          this.user_site = res['result'][0].user_site;
          this.goods_war = res['result'][0].product_goods_war;
          this.goods_stime = res['result'][0].product_goods_stime;
          this.goods_price = res['result'][0].product_goods_price;
          this.goods_discount = res['result'][0].product_goods_discount;
          this.goods_comment = res['result'][0].product_goods_comment;
          this.goods_price2 = Number(res['result'][0].product_goods_price) * Number(res['result'][0].product_goods_discount) / 100;
          this.goods_price2 = Number(res['result'][0].product_goods_price) - Number(this.goods_price2);

          this.site1 = res['result'][0].product_goods_site1; this.img1 = res['result'][0].product_goods_img1;
          this.site2 = res['result'][0].product_goods_site2; this.img2 = res['result'][0].product_goods_img2;
          this.site3 = res['result'][0].product_goods_site3; this.img3 = res['result'][0].product_goods_img3;
          this.site4 = res['result'][0].product_goods_site4; this.img4 = res['result'][0].product_goods_img4;
          this.site5 = res['result'][0].product_goods_site5; this.img5 = res['result'][0].product_goods_img5;

          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_product

  get_specification() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'product_get_specification', { id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_specification.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_specification

  add_to_bascket() {
    /*
    if (this.username == undefined) {
      this.username = Math.floor(Math.random() * 9999999);
      localStorage.setItem('username', this.username);
    }
    */
    if (!this.user_id) {
      this.router.navigate(['/login']);
    }
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 1995
      , user_id: this.user_id
      , material_id: this.id
      , number: 1
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          var pe_message = "در سبد خرید قرار گرفت";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }//end if
        else if (res['status'] == 4) {
          var pe_message = "این مورد هم اکنون در سبد خرید شما قرار دارد";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
        else {
          this.message(true, this.messageService.erorr_in_save(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )

  }
  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) this.loading = false;
    if (validation == true) {
      this.matSnackBar.open(message, action, { duration: 8000 });
    }//end if
    else {
      //this.matSnackBar.dismiss();
    }
  }//end 
  //*******************************************************************************
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }//end if
  }//end OnDestroy
}





