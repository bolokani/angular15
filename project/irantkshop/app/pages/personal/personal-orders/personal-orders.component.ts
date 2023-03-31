import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-personal-orders',
  templateUrl: './personal-orders.component.html',
  styleUrls: ['./personal-orders.component.scss']
})
export class PersonalOrdersComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public activeTab: number;
  public tab_id: number;
  public list_orders: any = [];
  public date: String;
  public tracking_code: String;
  public amount: number;
  public discount: number;
  public list_invoice: any = [];
  public list_tab: any = [];

  constructor(
    public serverService: ServerService
    , public router: Router
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute
    , public matSnackBar: MatSnackBar) { }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.get_tabs();
    } else {
      this.router.navigate(['/login'])
    }
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.activeTab = params['activeTab'];
        this.get_invoice(this.activeTab);
      }
    )
  }


  get_tabs() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2057, user_id: this.user_id }).subscribe(
      (res: any) => {
        this.list_tab = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_tab.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_invoice(status: number) {
    this.tab_id = status;
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.serverService.send_loading(true);
    var obj = {
      address: 2053
      , user_id: this.user_id
      , status: status
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_invoice = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_invoice.push({
              date: res['result'][i].wharehouse_invoice_date,
              tracking_code: res['result'][i].wharehouse_invoice_tracking_code,
              amount: res['result'][i].wharehouse_invoice_sum,
              invoice_id: res['result'][i].wharehouse_invoice_id,
              discount: res['result'][i].discount
            })
          }
          this.get_orders_current(status);
          this.serverService.send_loading(false);
        }//end if
        else {
          this.serverService.send_loading(false);
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  open(id: number, title: string) {
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/product-' + id, title1]);
  }

  get_orders_current(status: number) {
    var obj = {
      address: 2056
      , user_id: this.user_id
      , status: status
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_orders = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_image();
            }
            this.list_orders.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  select_tab(tab: number) {
    this.router.navigate(['/profile/orders'], { queryParams: { activeTab: tab } })
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