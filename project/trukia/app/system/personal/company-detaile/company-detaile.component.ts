import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { identity, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDetaile2Component } from '../company-detaile2/company-detaile2.component';

@Component({
  selector: 'app-company-detaile',
  templateUrl: './company-detaile.component.html',
  styleUrls: ['./company-detaile.component.scss']
})
export class CompanyDetaileComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public loading_update: boolean = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public form1: FormGroup;
  public token: number;
  public user_token: number;
  public list_record: any = [];

  public company_title: string;
  public company_national_id: string;
  public company_economic_code: string;
  public company_rnumber: string;
  public company_date_registeration: string;
  public company_ceo: string;
  public company_national_code_ceo: string;
  public company_birth_date: string;
  public company_cellphone: string;
  public company_cellphone2: string;
  public user_phone: string;
  public company_phone: string;
  public company_adress: string;
  public company_code_posti: string;
  public company_email: string;
  public company_work_place: string;
  public state_title: string;
  public id: number;


  constructor(
    public serverService: ServerService
    , public router: Router
    , public dialog: MatDialog
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute) {



  }//end consructor

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )

    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
      this.get_user();
    }
  }

  get_user() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    var obj = {
      address: 6876,
      user_id: this.user_id,
      user_token: this.user_token
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.company_cellphone = res['result'][0].user_cellphone;
            this.get_user_info();
          } else {
            this.serverService.signout();
            this.message(false, "", 1, this.messageService.close(this.lang));
          }
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_user_info() {
    var obj = { address: 6903, user_id: this.user_id, user_token: this.user_token, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.company_title = res['result'][0].site_company_title;
            this.company_national_id = res['result'][0].site_company_national_id;
            this.company_economic_code = res['result'][0].site_company_economic_code;
            this.company_rnumber = res['result'][0].site_company_rnumber;
            this.company_date_registeration = res['result'][0].site_company_date_registeration;
            this.company_ceo = res['result'][0].site_company_ceo;
            this.company_national_code_ceo = res['result'][0].site_company_national_code_ceo;
            this.company_birth_date = res['result'][0].site_company_birth_date;
            this.company_cellphone2 = res['result'][0].site_company_cellphone2;
            this.user_phone = res['result'][0].user_phone;
            this.company_phone = res['result'][0].site_company_phone;
            this.company_adress = res['result'][0].site_company_adress;
            this.company_code_posti = res['result'][0].site_company_code_posti;
            this.company_email = res['result'][0].site_company_email;
            this.company_work_place = res['result'][0].site_company_work_place;
            this.state_title = res['result'][0].site_state_title;
          } else {
            this.company_title = '-';
            this.company_national_id = '-';
            this.company_economic_code = '-';
            this.company_rnumber = '-';
            this.company_date_registeration = '-';
            this.company_ceo = '-';
            this.company_national_code_ceo = '-';
            this.company_birth_date = '-';
            this.company_cellphone2 = '-';
            this.user_phone = '-';
            this.company_phone = '-';
            this.company_adress = '-';
            this.company_code_posti = '-';
            this.company_email = '-';
            this.company_work_place = '-';
            this.state_title = '-';
          }

          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }


  open() {
    const dialogRef = this.dialog.open(CompanyDetaile2Component, {
      width: '50rem',
      height: 'auto',
      hasBackdrop: true,
      data: { user_id: this.user_id, type_task: 2, id: this.id }
    });
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.company_title = res.site_company_title;
          this.company_national_id = res.site_company_national_id;
          this.company_economic_code = res.site_company_economic_code;
          this.company_rnumber = res.site_company_rnumber;
          this.company_date_registeration = res.site_company_date_registeration;
          this.company_ceo = res.site_company_ceo;
          this.company_national_code_ceo = res.site_company_national_code_ceo;
          this.company_birth_date = res.site_company_birth_date;
          this.company_cellphone2 = res.site_company_cellphone2;
          this.user_phone = res.company_user_phone;
          this.company_phone = res.site_company_phone;
          this.company_adress = res.site_company_adress;
          this.company_code_posti = res.site_company_code_posti;
          this.company_email = res.site_company_email;
          this.company_work_place = res.site_company_work_place;
          this.state_title = res.site_state_title;
        }
      }
    )
  }
  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) {
      this.loading_update = false;
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

