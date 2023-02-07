import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from '../../../services/server/server.service';
import { MessageService } from '../../../services/message/message.service';


@Component({
  selector: 'app-shop-order',
  templateUrl: './shop-order.component.html',
  styleUrls: ['./shop-order.component.scss']
})
export class ShopOrderComponent implements OnInit, OnDestroy {
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info = JSON.parse(<any>localStorage.getItem('user_info'));
  public server: any = this.serverService.get_server();
  public token_order: any = JSON.parse(<any>localStorage.getItem('token_order'));
  public loading = false;
  public subscription: Subscription;
  public list_bascket: any = [];
  public count: number;
  public number: number;
  public sum: number = 0;
  public user_id: any;
  public show: string = "list";

  constructor(
    public serverService: ServerService
    , public messageService: MessageService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public dialog: MatDialog) {
    this.serverService.get_order2().subscribe(
      (res) => {
        this.get_bascket();
      }
    )
  }//end consructor

  ngOnInit() {
    this.serverService.send_stepper_index(0);
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
    var user_id = this.user_id;
    if (!this.user_id) {
      user_id = this.token_order;
    }
    this.loading = true;
    var obj = {
      address: 1987,
      user_id: user_id
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_bascket = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            res['result'][i].price_without_discount = res['result'][i].wharehouse_order_number * res['result'][i].wharehouse_material_price2;
            res['result'][i].price_with_discount = res['result'][i].wharehouse_order_number * res['result'][i].wharehouse_material_price3;
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo();
            }
            this.list_bascket.unshift(res['result'][i]);
          }//end for
          this.get_all_sum();
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
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = { address: 1988, order_id: id, value: value }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.list_bascket[i].wharehouse_order_number = value;
            this.list_bascket[i].price_without_discount = res['result'][0].wharehouse_order_number * res['result'][0].wharehouse_material_price2;
            this.list_bascket[i].price_with_discount = res['result'][0].wharehouse_order_number * res['result'][0].wharehouse_material_price3;
            this.get_all_sum();
            //this.serverService.send_list_bascket(this.list_bascket[i]);
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_all_sum() {
    this.count = this.list_bascket.length;
    this.sum = 0;
    for (var i = 0; i < this.list_bascket.length; i++) {
      this.sum = this.sum + this.list_bascket[i].price_with_discount;
    }
  }

  show_table() {
    this.show = "table";
  }
  show_list() {
    this.show = "list";
  }

  delete(i: number, id: number) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1997, id: id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_bascket.splice(i, 1);
          this.serverService.send_count_order();
          this.get_all_sum();
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
    this.router.navigate(['/product-' + id, title1]);
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
    if (this.list_bascket.length == 0) {
      var pe_message = "سبد خرید شما خالی می باشد.لطفا از منوی محصولات ، محصول خود را انتخاب نمائید";
      this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
      return false;
    }//end 

    if (!this.user_id) {
      this.router.navigate(['/login']);
    } else {
      if (this.serverService.check_internet() == false) {
        this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
        return;
      }//end if
      else { this.matSnackBar.dismiss(); }
      this.loading = true;
      var obj = {
        address: 2006
        , user_id: this.user_id
      }
      this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
        (res: any) => {
          if (res['status'] == 1 && res['num'] == 1) {
            this.router.navigate(['/shopping', 'address']);
            this.message(false, "", 1, this.messageService.close(this.lang));
          }//end if
          else {
            this.serverService.signout();
          }
        }
      )
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





