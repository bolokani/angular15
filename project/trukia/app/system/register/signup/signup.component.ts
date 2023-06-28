import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../../services/server/server.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  public isOnline: any | undefined;
  public loading = false;
  user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  user_id: number | undefined;
  public subscription: Subscription | any;
  public err: string | undefined; public err_validation: boolean = false;
  public err_internet_text: string | undefined; public err_internet_validation: boolean | undefined;
  public server: any = this.serverService.get_server();

  form1: FormGroup | any;
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
  public status: any | undefined;
  valid_email: boolean = false;
  public name: string | undefined;
  public loading_login = false;
  public loading_sign = false;

  constructor(public serverService: ServerService, public router: Router, public matSnackBar: MatSnackBar) { }//end consructor

  ngOnInit() {
    this.create_form();
  }

  create_form() {
    this.form1 = new FormGroup({
      'user': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  signup() {
    this.login_text = "";
    this.loading = true;
    this.loading_sign = true;
    var obj = {
      'address': 1772
      , 'email': this.form1.value.email
      , 'user': this.form1.value.user
      , 'password': this.form1.value.password
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.validation_email(res['result'][0].user_email, res['result'][0].user_email_valid);
        }//end if
        else if (res['status'] == 4) {
          this.loading_sign = false;
          var pe_message = "این پست الکترونیک قبلا در سیستم ثبت شده است";
          var pe_action = "بستن";
          this.recieve_message(true, 'Erorr in recieve	', pe_message, 1, 'close', pe_action);
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.recieve_message(true, 'Erorr in recieve	', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }//end signup

  validation_email(email: string, user_email_valid: number) {
    var obj = {
      address: 1773
      , email: email
      , user_email_valid: user_email_valid
      , subject: "تکمیل ثبت نام"
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.loading_sign = false;
          this.valid_email = true;
          var pe_message = "ثبت نام شما با موفقیت انجام شد . لینک تایید ایمیل برای شما ارسال شده است.";
          var pe_action = "بستن";
          this.recieve_message(true, '---', pe_message, 1, 'close', pe_action);
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.recieve_message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }
  //**************************************************
  recieve_message(validation: boolean, en_message: string, pe_message: string, type: number, en_action: string, pe_action: string) {
    this.err_internet_validation = false;
    if (type == 1) this.loading = false;
    if (validation == true) {
      this.matSnackBar.open(pe_message, pe_action, { duration: 8000 });
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
