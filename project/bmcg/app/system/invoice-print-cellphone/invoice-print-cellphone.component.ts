import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '../services/message/message.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-invoice-print-cellphone',
  templateUrl: './invoice-print-cellphone.component.html',
  styleUrls: ['./invoice-print-cellphone.component.scss']
})
export class InvoicePrintCellphoneComponent implements OnInit, OnDestroy {
  //**********************************************************
  public server_main: string = this.serverService.get_server();
  public server: string = this.serverService.get_server();
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public site: string = this.serverService.get_site();
  public loading: boolean = false;
  public subscription: Subscription | undefined;
  public code: any | undefined;
  public id: number | undefined;
  public user_id: number | undefined;
  public type_task: number | undefined;
  public creator: number | undefined;
  public level: number | undefined;
  public access_service: number | undefined;
  public sum1: number = 0;
  public sum2: number = 0;
  public sum1_letter: string | undefined;
  public sum: number = 0;
  public date!: string;
  public status_title!: string;
  public user_title!: string;
  public device_title!: string;
  public invoice_date!: string;
  public invoice_number!: string;
  public exchange_rate!: number;
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
  //******************************************************************************
  public list_cost: any = [];
  public obj: any;
  //******************************************************************************
  public mat_table_selectedRow: any;
  public mat_table_hoverRow: any;
  public dataSource: any | undefined;
  public displayedColumns = ['row', 'title', 'price', 'status', 'comment', 'attachment', 'operation'];
  public displayedColumns2 = ['row', 'document', 'date3', 'price', 'user1', 'bank1', 'origin_account', 'user2', 'bank2', 'destinition_account', 'tracking_code', 'type', 'payment_type', 'comment', 'attachment', 'operation'];
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
      address: 6867,
      brand: obj.brand,
      tip: obj.tip,
      year: obj.year
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj1).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.id = res['result'][0].site_invoice_id;
          this.get_cost2();
          this.get_invoice();
          this.get_setting();
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_invoice() {
    var obj = { address: 6840, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.invoice_date = res['date'];
          this.invoice_number = res['result'][0].site_invoice_id;
          this.brand = res['result'][0].site_brand_title;
          this.color = res['result'][0].site_brand_color;
          this.tip = res['result'][0].site_tip_title;
          this.year_title = res['result'][0].site_year_title;
          this.exchange_rate = res['result'][0].site_invoice_exchange_rate;
          this.vin = res['result'][0].site_brand_vin11;
          this.user_title = res['result'][0].site_invoice_user;
          this.date = res['date'];
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang))

        }
      }
    )
  }//end get_cost2

  get_cost2() {
    var obj = { address: 6839, code: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_cost = [];
        if (res['status'] == 1) {
          this.sum1 = 0;
          for (var i = 0; i < res['num']; i++) {
            this.list_cost.push(res['result'][i]);
          }//end for
          this.get_sum1();
          this.dataSource = new MatTableDataSource(this.list_cost);
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang))

        }
      }
    )
  }//end get_cost2

  get_setting() {
    var obj = { address: 6842, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.fulladdress = res['result'][0].site_setting_fulladdress;
          this.phone = res['result'][0].site_setting_phone;
          this.cellphone = res['result'][0].site_setting_cellphone;
          this.fax = res['result'][0].site_setting_fax;
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang))

        }
      }
    )
  }//end get_setting
  //*******************************************************************************
  get_sum1() {
    this.sum1 = 0;
    for (var i = 0; i < this.list_cost.length; i++) {
      this.sum1 = this.sum1 + this.list_cost[i].invoice_cost2_price;
    }
  }

  change_items(i: number, id: number) {
    this.list_cost[i].done = false;
    this.dataSource.data = this.list_cost;
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
