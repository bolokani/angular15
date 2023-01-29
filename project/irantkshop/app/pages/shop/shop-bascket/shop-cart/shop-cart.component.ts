import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from '../../../services/server/server.service';
import { MessageService } from '../../../services/message/message.service';


@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit, OnDestroy {
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info = JSON.parse(<any>localStorage.getItem('user_info'));
  public server: any = this.serverService.get_server();
  public status: any = JSON.parse(<any>localStorage.getItem('status'));
  public loading = false;
  public subscription: Subscription;
  public list_bascket: any = [];
  public number: number;
  public sum: number = 0;
  public user_id: any;

  constructor(
    public serverService: ServerService
    , public messageService: MessageService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public dialog: MatDialog) {
    /*
   this.serverService.get_list_bascket().subscribe( 
    (result)=>{ 
     //4 for delete
     if(result.type == 4){ 
      var price = result.price * result.number1;
      var discount = price * result.discount / 100 ;
      var price_with_discount = price - discount;
      this.sum = this.sum - price_with_discount;
      this.list_bascket.splice(result.i,1);   
     }//end if
    }
   );
   */
  }//end consructor

  ngOnInit() {
    this.serverService.status1(1);
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    this.get_bascket();
  }


  get_bascket() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 1987,
      user_id: this.user_id
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_bascket = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            res['result'][i].price_without_discount = res['result'][i].wharehouse_order_number * res['result'][i].wharehouse_order_cost;
            res['result'][i].sum = res['result'][i].wharehouse_order_number * res['result'][i].wharehouse_order_cost;
            res['result'][i].product_goods_price_with_discount = res['result'][i].product_goods_price1 * res['result'][i].product_bascket_number;
            this.sum = this.sum + res['result'][i].price_without_discount;
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            }
            this.list_bascket.unshift(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_bascket

  change_number(i: number, id: number) {
    var x = <any>document.getElementById('number' + id);
    var value = x.value;
    var price_temp = this.list_bascket[i].product_goods_price_with_discount;
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'product_update_bascket', { id: id, value: value }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_bascket[i].wharehouse_order_number = value;
          this.list_bascket[i].sum = this.list_bascket[i].wharehouse_order_number * this.list_bascket[i].wharehouse_order_cost;
          this.list_bascket[i].product_goods_price_without_discount = this.list_bascket[i].product_goods_price * value;
          this.sum = Number(this.sum) - Number(price_temp);
          this.sum = Number(this.sum) + Number(this.list_bascket[i].product_goods_price_with_discount);
          this.list_bascket[i].type = 2;
          this.list_bascket[i].i = i;
          this.list_bascket[i].sum = this.sum;
          //this.serverService.send_list_bascket(this.list_bascket[i]);
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  delete(i: number, id: number): any {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var price_temp = this.list_bascket[i].product_goods_price_with_discount;
    this.subscription = this.serverService.post_address(this.server, 'product_delete_bascket', { id: id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.sum = Number(this.sum) - Number(price_temp);
          this.list_bascket[i].type = 3;
          this.list_bascket[i].i = i;
          this.list_bascket[i].sum = this.sum;
          //this.serverService.send_list_bascket(this.list_bascket[i]);
          //this.serverService.send_count_bascket(-1);
          this.list_bascket.splice(i, 1);
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  open_product(id: number, title: string) {
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/goods-detaile', id, title1])
  }//end open_product

  open_supplier(username: string, id: number) {
    /*
    this.dialog.open(ShopSupplierDetaileComponent,{
     width:'1500px',
     height:'100%',
     data:{ id : id , username : username }
    })
    */
  }

  continue(): any {
    if (this.status == 1) {
      if (this.list_bascket.length == 0) {
        var pe_message = "سبد خرید شما خالی می باشد.لطفا از منوی محصولات ، محصول خود را انتخاب نمائید";
        this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        return false;
      }//end 
      this.router.navigate(['/shop-shopping', 'address']);
    } else {
      this.router.navigate(['/login', 3]);
    }
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





