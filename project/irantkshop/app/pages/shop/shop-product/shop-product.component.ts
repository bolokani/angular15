import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { ShopProductDetaileComponent } from '../shop-product-detaile/shop-product-detaile.component';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.css']
})
export class ShopProductComponent implements OnInit, OnDestroy {
  public lang = JSON.parse(<any>localStorage.getItem('lang'));

  public isOnline: any;
  public loading = false;
  public subscription: Subscription;
  public err: string; public err_validation: boolean = false;
  public err_internet_text: string; public err_internet_validation: boolean;
  public server: any;
  public id: number;
  public list_product: any = [];
  public username: any;
  public cate1: number;
  public list_cate1: any = [];
  public cate1_title: string;
  public num_product: number;
  public user_id: any;


  constructor(
    public serverService: ServerService
    , public router: Router
    , public activatedRoute: ActivatedRoute
    , public dialog: MatDialog
    , public messageService: MessageService
    , public matSnackBar: MatSnackBar) { }//end consructor

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.server = this.serverService.get_server();
        this.id = params['id'];
        this.get_products();
      }
    );
    this.username = localStorage.getItem('username');
    this.user_id = localStorage.getItem('user_id');
    if (!this.user_id) {
      var code = Math.floor(Math.random() * 99999999999999);
      this.user_id = localStorage.setItem('user_id', JSON.stringify(code));
    }//end if
    this.user_id = localStorage.getItem('user_id');
    this.get_products();
    this.get_cate1();
  }//ngOnInit

  get_products() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 432, id: this.id }).subscribe(
      (res: any) => {
        this.list_product = [];
        if (res['status'] == 1) {
          this.num_product = res['num'];
          for (var i = 0; i < res['num']; i++) {
            res['result'][i].product_goods_price2 = Number(res['result'][i].product_goods_price) * Number(res['result'][i].product_goods_discount) / 100;
            res['result'][i].product_goods_price2 = Number(res['result'][i].product_goods_price) - Number(res['result'][i].product_goods_price2);
            this.list_product.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end ngOnInit

  get_cate1() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { id: this.id, address: 433 }).subscribe(
      (res: any) => {
        this.list_cate1 = [];
        if (res['status'] == 1) {
          this.cate1_title = res['result'][0].product_cate1_title;
          for (var i = 0; i < res['num']; i++) {
            this.list_cate1.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end ngOnInit

  go_to_products(cate1: any, id: number, product_title: string) {
    var title = "";
    var title_arr = product_title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title += title_arr[i];
      title += "-";
    }
    this.router.navigate(['/shop-product', id, title]);
  }//go_to_products

  open_product(id: number) {
    this.dialog.open(ShopProductDetaileComponent, {
      width: '75rem',
      height: 'auto',
      data: { id: id }
    })
  }//end open_product

  open_supplier(username: string) {
    /*
    this.dialog.open(ShopSupplierDetaileComponent, {
      width: '75rem',
      height: 'auto',
      data: { id: username }
    })
    */
  }


  add_to_bascket(id: number) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'product_add_to_bascket', { user_id: this.user_id, 'goods_id': id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          var pe_message = "در سبد خرید قرار گرفت";
          var pe_action = "بستن";
          //this.serverService.send_count_bascket(1);
          res['result'].type = 1;
          res['result'].product_goods_price;
          res['result'].product_goods_number;
          res['result'].product_goods_discount;
          //this.serverService.send_list_bascket(res['result']);
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else if (res['status'] == 4) {
          var pe_message = "این مورد هم اکنون در سبد خرید شما قرار دارد";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
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
