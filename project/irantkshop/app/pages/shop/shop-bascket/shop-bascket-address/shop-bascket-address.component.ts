import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from '../../../services/server/server.service';
import { MessageService } from '../../../services/message/message.service';
//import { PersonalChangeProfileComponent } from '../../../personal/personal-change-profile/personal-change-profile.component';



@Component({
  selector: 'app-shop-bascket-address',
  templateUrl: './shop-bascket-address.component.html',
  styleUrls: ['./shop-bascket-address.component.css']
})
export class ShopBascketAddressComponent implements OnInit, OnDestroy {
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info = JSON.parse(<any>localStorage.getItem('user_info'));
  public server: any = this.serverService.get_server();
  public status: any = JSON.parse(<any>localStorage.getItem('status'));
  public token_order: any = JSON.parse(<any>localStorage.getItem('token_order'));
  public loading = false;
  public subscription: Subscription;
  public username: any;
  public list_bascket: any = [];
  public sum_all: number = 0;
  public cellphone: any;
  public user_id: any;
  public list_stime: any = [];
  public user_title_stime: string;
  public user_cellPhone_stime: any;
  public user_address_stime: any;
  public user_code_posti_stime: any;
  public user_stime: number;
  public stime_id: number = 0;
  public invoice_id: number;
  public invoice_date: string;
  public tracking_code: string;
  public count: number;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public dialog: MatDialog
    , public messageService: MessageService) {
  }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    this.get_user();
  }//end ngOnInit

  get_user(): any {
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
            this.check_invoice();
            this.get_bascket();
          }//end if
          else {
            this.serverService.signout();
          }
        }
      )
    }
  }//end get_user

  check_invoice(): any {
    var obj = {
      address: 2008
      , user_id: this.user_id
      , token_order: this.token_order
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.add_orders_to_invoice(res['result'][0].wharehouse_invoice_id);
          } else {
            this.create_invoice();
          }
        }//end if
        else {
          var pe_message = "خطا در بررسی وجود فاکتور";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_invoice(invoice_id: number): any {
    var obj = {
      address: 2011
      , user_id: this.user_id
      , invoice_id: invoice_id
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.invoice_id = res['result'][0].wharehouse_invoice_id;
          this.invoice_date = res['result'][0].wharehouse_invoice_date;
          this.tracking_code = res['result'][0].wharehouse_invoice_tracking_code;
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_save(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  create_invoice(): any {
    var obj = {
      address: 2009
      , user_id: this.user_id
      , token_order: this.token_order
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.add_orders_to_invoice(res['result'][0].wharehouse_invoice_id);
        }//end if
        else {
          var pe_message = "خطا در ایجاد فاکتور جدید";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end create_invoice

  add_orders_to_invoice(invoice_id: number): any {
    var obj = {
      address: 2010
      , invoice_id: invoice_id
      , user_id: this.user_id
      , token_order: this.token_order
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.get_invoice(invoice_id)
        }//end if
        else {
          var pe_message = "خطا در اضافه کردن رکورد به فاکتورها";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_bascket() {
    var obj = {
      address: 2012,
      user_id: this.user_id,
      token_order: this.token_order
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.sum_all = res['result'][0].sum;
          this.count = res['num'];
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_bascket

  continue(): any {
    if (!this.user_id) {
      this.router.navigate(['/login']);
    }
    var obj = {
      address: 2013,
      user_id: this.user_id,
      token_order: this.token_order
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any): any => {
        if (res['status'] == 1) {
          if (res['num'] == 0) {
            var pe_message = "سبد خرید شما خالی می باشد.لطفا از منوی محصولات ، محصول خود را انتخاب نمائید";
            this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
            return false;
          }
          else {
            this.router.navigate(['/shopping', 'tracking']);
          }//end else
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  /*
    continue(): any {
      this.router.navigate(['/shopping', 'tracking']);
      
      if (this.status == 1) {
        if (this.list_bascket.length == 0) {
          var pe_message = "سبد خرید شما خالی می باشد.لطفا از منوی محصولات ، محصول خود را انتخاب نمائید";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
          return false;
        }//end 
  
  
        if (!this.user_title_stime || !this.user_cellPhone_stime || !this.user_code_posti_stime || !this.user_address_stime) {
          var pe_message = "لطفا آدرس تحویل را کامل تکمیل نمائید";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
          return false;
        }//end 
  
        if (!this.stime_id) {
          var pe_message = "لطفا نحوه ارسال را انتخاب نمائید";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
          return false;
        }//end 
  
        this.router.navigate(['/shop-shopping', 'pay']);
      } else {
        this.router.navigate(['/login', 2]);
      }
      
    }
    */

  ngAfterViewInit() {
    this.serverService.send_stepper_index(1)
  }
  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) this.loading = false;
    if (validation == true) {
      this.matSnackBar.open(message, action, { duration: 5000 });
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



