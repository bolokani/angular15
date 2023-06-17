import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MessageService } from '../../services/message/message.service';


@Component({
  selector: 'app-personal-invoice2',
  templateUrl: './personal-invoice2.component.html',
  styleUrls: ['./personal-invoice2.component.scss']
})
export class PersonalInvoice2Component implements OnInit, OnDestroy {
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
  public user_token: number | undefined;
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
  public list_record: any = [];
  public plate_date: string;
  public contract_number: string;
  public model_year: string;
  public hnumber_title: string;
  @Input('obj') public root_obj: any;
  //******************************************************************************
  public list_cost2: any = [];
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
  }

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
    }
    if (this.root_obj) {
      this.id = this.root_obj.id;
    }
    this.get_contract();
    this.get_cost2();
    this.get_setting();
  }//end ngOnInit 

  get_setting() {
    var obj = { address: 6877, id: this.id }
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

  get_contract() {
    var obj = {
      address: 6878
      , id: this.id
      , user_token: this.user_token
      , user_id: this.user_id
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.contract_number = res['result'][0].contract_list_contract_number;
          this.contract_date = res['result'][0].contract_list_contract_date;
          this.plate_date = res['result'][0].contract_list_plate_date;
          this.brand = res['result'][0].site_brand_title;
          this.model_year = res['result'][0].model_year;
          this.tip = res['result'][0].site_tip_title;
          this.hnumber_title = res['result'][0].site_hnumber_title;
          this.year_title = res['result'][0].site_year_title;
          this.color = res['result'][0].site_brand_color;
          this.status_title = res['result'][0].site_astatus_title;
          this.user_title = res['result'][0].user_title;
          this.vin = res['result'][0].contract_list_vin;
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang))

        }
      }
    )
  }//end get_contract

  get_cost2() {
    this.loading = true;
    var obj = {
      address: 6776,
      code: this.id,
      user_id: this.user_id,
      user_token: this.user_token
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_cost2 = [];
          for (var i = 0; i < res['num']; i++) {
            this.list_cost2.push(res['result'][i]);
          }
          this.get_sum1();
          this.message(false, "", 1, this.messageService.close(1));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(1), 1, this.messageService.close(1));
        }
      }
    )
  }

  get_sum1() {
    this.sum1 = 0;
    for (var i = 0; i < this.list_cost2.length; i++) {
      this.sum1 = this.sum1 + this.list_cost2[i].contract_cost2_price;
    }
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

