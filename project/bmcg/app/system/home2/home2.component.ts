import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '../services/message/message.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public server: any = this.serverService.get_server();
  public lang = JSON.parse(<any>localStorage.getItem('lang'));

  public loading = false;
  public user_id: number;
  public subscription: Subscription;
  public logo: string | undefined;
  public cellphone: number | undefined;
  public title: number | undefined;
  public logo_info: any | undefined;
  public token: number;
  public list_brand: any = [];
  public list_tip: any = [];
  public list_year: any = [];
  public form1: FormGroup;
  public brand_title: string | undefined;
  public tip_title: string | undefined;
  public year_title: string | undefined;
  public editor_date: string;
  public brand_color: string;
  public type: string = 'customs';
  public user_title: string;

  public exchange_rate: number | string;
  public sum: number | string;
  public tax: number | string;
  public vin11: number | string = 0;
  public count_record: number = 0;
  public search: boolean = false;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute
    , public matSnackBar: MatSnackBar) {
  }//end consructor

  ngOnInit() {
    this.create_form();
    this.get_brand();
    this.get_tip();
    this.get_year();
  }

  create_form() {
    this.form1 = new FormGroup({
      'brand': new FormControl(),
      'tip': new FormControl(),
      'year': new FormControl(),
    })
  }

  get_type(type: string) {
    this.type = type;
    this.form1.reset();
    this.search = false;
    this.brand_title = '';
    this.tip_title = '';
    this.year_title = '';
    this.editor_date = '';
    this.brand_color = '';
    this.exchange_rate = "";
    this.vin11 = "";
    this.sum = "";
    this.tax = "";
    this.count_record = 0;

  }

  get_brand() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6853 }).subscribe(
      (res: any) => {
        this.list_brand = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_brand.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_tip() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6854, brand: this.form1.value.brand }).subscribe(
      (res: any) => {
        this.list_tip = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_tip.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_year() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6855 }).subscribe(
      (res: any) => {
        this.list_year = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_year.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_customs2() {
    if (this.type == 'customs') {
      this.get_customs();
    } else {
      this.get_invoice();
    }
  }

  get_invoice() {
    var obj = {
      address: 6857,
      brand: this.form1.value.brand,
      tip: this.form1.value.tip,
      year: this.form1.value.year,
    }
    this.loading = true;
    this.search = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.brand_title = res['result'][0].site_brand_title;
            this.tip_title = res['result'][0].site_tip_title;
            this.year_title = res['result'][0].site_tip_title;
            this.editor_date = res['result'][0].site_invoice_editor_date;
            this.brand_color = res['result'][0].site_brand_color;
            this.exchange_rate = res['result'][0].site_invoice_exchange_rate;
            this.vin11 = res['result'][0].site_brand_vin11;
            this.user_title = res['result'][0].site_invoice_user;
            this.count_record = res['num'];
          } else {
            this.brand_title = '';
            this.tip_title = '';
            this.year_title = '';
            this.user_title = '';
            this.editor_date = '';
            this.user_title = '';
            this.brand_color = '';
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

  get_customs() {
    var obj = {
      address: 6856,
      brand: this.form1.value.brand,
      tip: this.form1.value.tip,
      year: this.form1.value.year,
    }
    this.loading = true;
    this.search = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
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

  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) { this.loading = false; }
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
