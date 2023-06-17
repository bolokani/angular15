import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MessageService } from '../../services/message/message.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-contract-cost-invoice2',
  templateUrl: './contract-cost-invoice2.component.html',
  styleUrls: ['./contract-cost-invoice2.component.scss']
})
export class ContractCostInvoice2Component implements OnInit, OnDestroy {
  //**********************************************************
  public server_main: string = this.serverService.get_server();
  public server: string = this.serverService.get_server();
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public site: string = this.serverService.get_site();
  public loading: boolean = false;
  public subscription: Subscription;
  public code: any | undefined;
  public id: number | undefined;
  public user_id: number | undefined;
  public user_token: string | undefined;
  public type_task: number | undefined;
  public creator: number | undefined;
  public level: number | undefined;
  public access_service: number | undefined;
  public sum1: number = 0;
  public sum2: number = 0;
  public sum1_letter: string;
  public sum2_letter: string;
  public sum: number = 0;
  public list_material: any = [];
  public list_attachment: any = [];
  public date: string;
  public hnumber_title: string;
  public status_title: string;
  public user_title: string;
  public store_address: string;
  public store_phone: string;
  public logo_status: boolean;
  public store_title: string;
  public sex_title: string;
  public user_store: string;
  public user_address: string;
  public user_cellphone: string;
  public user_phone: string;
  public device_title: string;
  public brand_title: string;
  public model_title: string;
  public searial: string;
  public contract_date: string;
  public model_year: string;
  public contract_number: string;
  public brand: String;
  public tip: String;
  public year_title: String;
  public color: String;
  public vin: String;
  public plate_date: string;
  public contract_date1: string;
  public fulladdress: string;
  public phone: string;
  public fax: string;
  public cellphone: string;
  //******************************************************************************
  public list_cost: any = [];
  public list_finance: any = [];
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
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )
    //this.serverService.status1(2);
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
    }
    this.get_access();

  }//end ngOnInit 

  get_access() {
    this.loading = true;
    var obj = {
      address: 6883
      , id: this.id
      , user_id: this.user_id
      , user_token: this.user_token
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.get_cost2();
            this.get_finance();
            this.get_contract();
            this.get_setting();
          } else {
            this.serverService.signout();
          }
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang))

        }
      }
    )
  }


  get_contract() {
    var obj = { address: 6787, id: this.id }
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

  get_cost2() {
    var obj = { address: 6785, code: this.id }
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
  //********************************************************************************* */
  get_finance() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = { address: 6786, id: this.id, contract_id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_finance = [];
          for (var i = 0; i < res['num']; i++) {
            this.list_finance.push(res['result'][i]);
          }
          this.get_sum2();
          this.dataSource = new MatTableDataSource(this.list_finance);
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_data

  get_sum2() {
    this.sum2 = 0;
    for (var i = 0; i < this.list_finance.length; i++) {
      if (this.list_finance[i].finance_financial2_document == 6) {
        this.sum2 = this.sum2 + this.list_finance[i].finance_financial2_amount;
      }
      else if (this.list_finance[i].finance_financial2_document == 7) {
        this.sum2 = this.sum2 - this.list_finance[i].finance_financial2_amount;
      }
    }

  }
  //*******************************************************************************
  get_sum1() {
    this.sum1 = 0;
    for (var i = 0; i < this.list_cost.length; i++) {
      this.sum1 = this.sum1 + this.list_cost[i].contract_cost2_price;
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
