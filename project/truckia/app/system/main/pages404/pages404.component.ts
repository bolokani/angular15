import { Component, OnInit, OnDestroy, ViewChild, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, pipe, Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';

@Component({
  selector: 'app-pages404',
  templateUrl: './pages404.component.html',
  styleUrls: ['./pages404.component.scss']
})

export class Pages404Component implements OnInit {
  public form1: FormGroup | any;
  public form2: FormGroup | any;
  public loading = false;
  public loading_login = false;
  public loading_sign = false;
  public subscription: Subscription | any;
  public err: string | undefined; public err_validation: boolean = false;
  public err_internet_text: string | undefined; public err_internet_validation: boolean | undefined;
  public obj: any | undefined;
  logo: string | undefined;

  public email: any | undefined;
  public cellphone: any | undefined;
  public fname: any | undefined;
  public lname: any | undefined;
  public login_text: string | undefined;
  public text_login: string | undefined;
  public title: string | undefined;
  public group: any | undefined;
  public code: number | undefined;
  public type: any | undefined;
  public username: any | undefined;
  public user_id: any | undefined;
  public server: any = this.serverService.get_server();
  public status: any | undefined;
  valid_email: boolean = false;
  public name: string | undefined;
  height: string = window.innerHeight - 100 + 'px';
  list_country: any = [];

  constructor(private fb: FormBuilder, public serverService: ServerService, public router: Router, public matSnackBar: MatSnackBar
    , public activatedRoute: ActivatedRoute) {
  }//end consructor

  ngOnInit() {
    this.serverService.top();
    this.status = JSON.parse(<any>localStorage.getItem("status"));
    if (this.status == 1) {
      this.router.navigate(["/phome"]);
    };
    this.get_site_name();
    this.serverService.top();
    this.get_titles();
  }//end ngOnInit


  get_titles() {
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1790 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['result'][0].site_setting_logo) {
            this.logo = res['result'][0].site_setting_site_logo + "/" + res['result'][0].site_setting_logo;
          } else {
            this.logo = "../../assets/img/logo.png";
          }
          this.serverService.send_logo(this.logo);
          this.serverService.set_metas('not-found', '', '', '');
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


  get_site_name() {
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1061, id: 7 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.name = res['result'][0].site_setting_command;
          }
          this.recieve_message(false, "", "", 1, "", "");
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.recieve_message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }//get_site_name

  //**************************************************
  recieve_message(validation: boolean, en_message: string, pe_message: string, type: number, en_action: string, pe_action: string) {
    this.err_internet_validation = false;
    if (type == 1) this.loading = false;
    if (validation == true) {
      this.matSnackBar.open(pe_message, pe_action, { duration: 5000 });
    }//end if
    else {
      //this.matSnackBar.dismiss();
    }
  }

}
