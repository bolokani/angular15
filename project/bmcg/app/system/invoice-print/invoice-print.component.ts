import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '../services/message/message.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.scss']
})
export class InvoicePrintComponent implements OnInit, OnDestroy {
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
  public value_custom: number = 0;
  public value_custom2: number = 0;
  public cpt: number = 0;
  public customs_sum: number = 0;
  public customs_tax: number = 0;

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
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.id = res['result'][0].site_invoice_id;
            this.get_invoice(obj);
            this.get_setting();
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

  get_invoice(obj: any) {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6840, id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.invoice_date = res['result'][0].site_invoice_editor_date;
          this.invoice_number = res['result'][0].site_invoice_id;
          this.brand = res['result'][0].site_brand_title;
          this.color = res['result'][0].site_brand_color;
          this.tip = res['result'][0].site_tip_title;
          this.year_title = res['result'][0].site_year_title;
          this.vin = res['result'][0].site_brand_vin11;
          this.user_title = res['result'][0].site_invoice_user;
          this.get_cusomes(obj);
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang))

        }
      }
    )
  }//end get_cost2

  get_cusomes(obj: any) {
    var obj1 = {
      address: 6895,
      brand: obj.brand,
      tip: obj.tip,
      year: obj.year,
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj1).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.exchange_rate = res['result'][0].site_customs_exchange_rate;
            this.cpt = res['result'][0].site_customs_cpt;
            this.value_custom = res['result'][0].site_customs_value_custom;
            this.value_custom2 = res['result'][0].site_customs_value_custom2;

            this.customs_sum = res['result'][0].site_customs_sum;
            this.customs_tax = res['result'][0].site_customs_tax;
            this.get_cost2();
          } else {
            this.exchange_rate = 0;
            this.cpt = 0;
            this.value_custom = 0;
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_cost2() {
    var obj = { address: 6839, code: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_cost = [];
        if (res['status'] == 1) {
          this.sum1 = 0;
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].contract_cost_customs_license == 1) {
              res['result'][i].invoice_cost2_price = this.customs_sum;
            }
            if (res['result'][i].contract_cost_tax == 1) {
              res['result'][i].invoice_cost2_price = this.customs_tax;
            }
            if (res['result'][i].contract_cost_value_custom == 1) {
              res['result'][i].invoice_cost2_price = this.value_custom;
            }


            this.list_cost.push(res['result'][i]);
          }//end for
          this.get_sum1();
          this.set_log();
          this.dataSource = new MatTableDataSource(this.list_cost);
          this.serverService.send_invoice_print_cellphone({ list_cost: this.list_cost });
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang))

        }
      }
    )
  }//end get_cost2

  set_log() {
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6898, id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

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
