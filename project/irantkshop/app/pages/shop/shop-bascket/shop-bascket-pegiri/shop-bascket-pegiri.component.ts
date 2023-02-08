import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../../services/server/server.service';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-shop-bascket-pegiri',
  templateUrl: './shop-bascket-pegiri.component.html',
  styleUrls: ['./shop-bascket-pegiri.component.css']
})
export class ShopBascketPegiriComponent implements OnInit, OnDestroy {
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info = JSON.parse(<any>localStorage.getItem('user_info'));
  public token_order: any = JSON.parse(<any>localStorage.getItem('token_order'));
  public server: any = this.serverService.get_server();
  public status: any = JSON.parse(<any>localStorage.getItem('status'));
  public loading = false;
  public subscription: Subscription;
  public user_id: any;
  public list_product: any = [];
  public code: number;
  public invoice_id: number;
  public invoice_date: string;
  public tracking_code: string;
  public count: number;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService) { }//end consructor

  ngOnInit() {
    this.serverService.send_stepper_index(2);
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    this.get_user();
  }

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
            this.get_invoice(res['result'][0].wharehouse_invoice_id);
            this.update_invoice_3_to_2(res['result'][0].wharehouse_invoice_id);
          } else {
            this.router.navigate(['/shopping/bascket'])
          }

        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end check_invoice

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
  }//end get_invoice

  update_invoice_3_to_2(invoice_id: number) {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2014, invoice_id: invoice_id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.update_orders_4_to_1(invoice_id);
        }//end if
        else {
          var pe_message = "خطا در تبدیل فاکتور ";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//update_invoice_3_to_2

  update_orders_4_to_1(invoice_id: number) {
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2015, invoice_id: invoice_id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.serverService.send_count_order();
          localStorage.setItem("token_order", JSON.stringify(new Date().getTime()));
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          var pe_message = "خطا در تبدیل رکوردهای فاکتور ";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//update_orders_4_to_1

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






