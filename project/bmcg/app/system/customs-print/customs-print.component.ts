import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '../services/message/message.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customs-print',
  templateUrl: './customs-print.component.html',
  styleUrls: ['./customs-print.component.scss']
})
export class CustomsPrintComponent implements OnInit, OnDestroy {
  //**********************************************************
  public server_main: string = this.serverService.get_server();
  public server: string = this.serverService.get_server();
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public site: string = this.serverService.get_site();
  public loading: boolean = false;
  public subscription: Subscription | undefined;
  public code: any | undefined;
  public id: number;
  public user_id: number | undefined;
  public type_task: number | undefined;
  public creator: number | undefined;
  public level: number | undefined;
  public access_service: number | undefined;
  public date!: string;
  public status_title!: string;
  public user_title!: string;
  public device_title!: string;
  public invoice_date!: string;
  public invoice_number!: string;
  public brand!: String;
  public tip!: String;
  public year_title!: String;
  public color!: String;
  public vin!: String;
  public fulladdress!: string;
  public phone!: string;
  public fax!: string;
  public cellphone!: string;
  public contract_date!: string;
  @Input('obj') public root_obj: any;

  public brand_title!: string;
  public tip_title!: string;
  public editor_date!: string;
  public brand_color!: string;
  public tax!: string;
  public count_record!: number;
  public exchange_rate!: string;
  public sum!: string;
  //******************************************************************************
  public list_cost: any = [];
  public obj: any;
  //******************************************************************************
  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute
  ) {
    this.serverService.get_invoice_print2().subscribe(
      (res) => {
        if (res) {
          this.get_id({ brand: res.obj.brand, tip: res.obj.tip, year: res.obj.year });
        }
      }
    )
  }

  ngOnInit() {
    this.get_id({ brand: this.root_obj.brand, tip: this.root_obj.tip, year: this.root_obj.year });
  }//end ngOnInit 

  get_id(obj: any) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj1 = {
      address: 6872,
      brand: obj.brand,
      tip: obj.tip,
      year: obj.year
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj1).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.id = res['result'][0].site_customs_id;
            this.get_customs(obj);
            this.message(false, "", 1, this.messageService.close(this.lang));
          } else {
            this.id = 0;
            this.message(false, "", 1, this.messageService.close(this.lang));
          }
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_customs(obj: any) {
    var obj1 = {
      address: 6856,
      brand: obj.brand,
      tip: obj.tip,
      year: obj.year,
    }
    this.loading = true;
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj1).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.brand_title = res['result'][0].site_brand_title;
            this.tip_title = res['result'][0].site_tip_title;
            this.year_title = res['result'][0].site_tip_title;
            this.editor_date = res['result'][0].site_customs_editor_date;
            this.brand_color = res['result'][0].site_brand_color;
            this.exchange_rate = res['result'][0].site_customs_exchange_rate;
            this.sum = res['result'][0].site_customs_sum;
            this.tax = res['result'][0].site_customs_tax;
            this.count_record = res['num'];
          } else {
            this.brand_title = '';
            this.tip_title = '';
            this.year_title = '';
            this.editor_date = '';
            this.brand_color = '';
            this.exchange_rate = "";
            this.sum = "";
            this.tax = "";
            this.count_record = 0;
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }
  //*******************************************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) {
      this.loading = false;
    }
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
