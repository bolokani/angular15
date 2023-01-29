import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { Meta, Title } from '@angular/platform-browser';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit, OnDestroy {
  public isOnline: any | undefined;
  public loading = false;
  user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  user_id: number | undefined;
  public subscription: Subscription | any;
  public err: string | undefined; public err_validation: boolean = false;
  public err_internet_text: string | undefined; public err_internet_validation: boolean | undefined;
  public server: any = this.serverService.get_server();
  id: number | undefined;
  title: string | undefined;
  date: string | undefined;
  city_title: string | undefined;
  cate_title: string | undefined;
  function_title: string | undefined;
  price: number | undefined;
  settlement_title: string | undefined;
  settlement: number | undefined;
  comment: string | undefined;
  list_attachment: any = [];
  currency_title: string | undefined;

  constructor(public serverService: ServerService, public router: Router, public matSnackBar: MatSnackBar
    , private activatedRoute: ActivatedRoute
    , private meta: Meta, title: Title,
    @Inject(MAT_DIALOG_DATA) private dialog_data: any, private matDialogRef: MatDialogRef<RuleComponent>) {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    if (dialog_data) {
      this.id = dialog_data.id;
      this.get_data();
    }

  }//end consructor

  ngOnInit() {
  }


  get_data() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1992, id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.comment = res['result'][0].site_setting_rule_site;
          this.recieve_message(false, "", "", 1, "", "");
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.recieve_message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }

  close() {
    this.matDialogRef.close();
  }
  //**************************************************
  recieve_message(validation: boolean, en_message: string, pe_message: string, type: number, en_action: string, pe_action: string) {
    this.err_internet_validation = false;
    if (type == 1) this.loading = false;
    if (validation == true) {
      if (this.lang == 1) this.matSnackBar.open(pe_message, pe_action, { duration: 5000 });
      if (this.lang == 2) this.matSnackBar.open(en_message, en_action, { duration: 5000 });
    }//end if
    else {
      //this.matSnackBar.dismiss();
    }
  }
  //*******************************************************************************
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }//end if
  }//end OnDestroy
}


