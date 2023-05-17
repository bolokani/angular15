import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '../services/message/message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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
  public show_invoice: boolean = false;
  public show_customs: boolean = false;
  public width: number;

  public exchange_rate: number | string;
  public sum: number | string;
  public tax: number | string;
  public vin11: number | string = 0;
  public count_record: number = 0;
  public search: boolean = false;
  public obj: any;

  public list_baner3: any = [
    {
      logo: "https://bmcg.ir/object/uploads/gallery/3.png"
    },
    {
      logo: "https://bmcg.ir/object/uploads/gallery/1.png"
    },
    {
      logo: "https://bmcg.ir/object/uploads/gallery/2.png"
    },
    {
      logo: "https://bmcg.ir/object/uploads/gallery/4.png"
    },
    {
      logo: "https://bmcg.ir/object/uploads/gallery/5.png"
    },
  ]
  public header_baner1 = "https://bmcg.ir/object/uploads/gallery/right.png";
  public header_baner2 = "https://bmcg.ir/object/uploads/gallery/top.png";
  public header_baner3 = "https://bmcg.ir/object/uploads/gallery/bottom3.png";

  constructor(
    public serverService: ServerService
    , public router: Router
    , public dialog: MatDialog
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
      'brand': new FormControl(null, Validators.required),
      'tip': new FormControl(null, Validators.required),
      'year': new FormControl(null, Validators.required),
      'type': new FormControl(null, Validators.required),
    })
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

  open_search() {
    if (this.form1.value.type == 1) {
      this.open_invoice();
    } else {
      this.open_customs();
    }
  }

  open_invoice(): any {
    if (!this.form1.valid) {
      var message = "لطفا تمامی آیتم ها را انتخاب نمائید.";
      this.message(true, this.messageService.message(this.lang, message, ''), 1, this.messageService.close(this.lang));
      return false;
    } else {
      this.obj = {
        brand: this.form1.value.brand,
        tip: this.form1.value.tip,
        year: this.form1.value.year
      }
      if (this.show_invoice == true) {
        this.serverService.send_invoice_print2({ obj: this.obj });
      } else {
        this.show_invoice = true;
        this.show_customs = false;
      }
    }
  }

  open_customs(): any {
    if (!this.form1.valid) {
      var message = "لطفا تمامی آیتم ها را انتخاب نمائید.";
      this.message(true, this.messageService.message(this.lang, message, ''), 1, this.messageService.close(this.lang));
      return false;
    } else {
      this.obj = {
        brand: this.form1.value.brand,
        tip: this.form1.value.tip,
        year: this.form1.value.year
      }
      if (this.show_customs == true) {
        this.serverService.send_invoice_print2({ obj: this.obj });
      } else {
        this.show_customs = true;
        this.show_invoice = false;
      }
    }
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
