import { Component, OnInit, OnDestroy, ViewChild, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { RuleComponent } from '../rule/rule.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public server: any = this.serverService.get_server();
  public status: any = JSON.parse(<any>localStorage.getItem("status"));
  public form1: FormGroup | any;
  public form2: FormGroup | any;
  public loading = false;
  public loading_login = false;
  public loading_sign = false;
  public subscription: Subscription;
  public user_id: any;
  public login_text: string | undefined;
  public text_login: string | undefined;
  public height: string = window.innerHeight - 100 + 'px';
  public valid_email: string;
  public remember: boolean | undefined;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public activatedRoute: ActivatedRoute
    , public dialog: MatDialog) {

    this.createFormSignup();
    this.create_form2();
  }//end consructor

  ngOnInit() {
    this.serverService.top();

    if (this.status == 1) {
      this.router.navigate(["/home"]);
    };
    var remember = JSON.parse(<any>localStorage.getItem("remember"));
    if (remember) {
      this.form2.patchValue({
        'username': remember.username,
        'password': remember.password,
        'remember': remember.remember
      })
      this.remember = true;
    }
  }//end ngOnInit

  eye() {
    var x = <any>document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  //******************************************************************************************************** */
  createFormSignup() {
    this.form1 = new FormGroup({
      'user': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      'password': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,}')]),
      'repassword': new FormControl(null, [Validators.required]),
      'rule': new FormControl(null, [Validators.required]),
    })
  }//end createForm 

  read_rule() {
    this.dialog.open(RuleComponent, {
      width: '55rem',
      height: 'auto',
      data: { id: 28 }
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
          //this.validation_email(res['result'][0].user_email, res['result'][0].user_email_valid);
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

  //************************************
  create_form2() {
    this.form2 = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,}')]),
      'password': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,}')]),
      'remember': new FormControl(null)
    })
  }//end loginForm

  login(): any {
    if (!this.form2.valid) {
      var pe_message = "نام کاربری و یا رمز عبور معتبر نمیباشد";
      var pe_action = "بستن";
      this.recieve_message(true, '----', pe_message, 1, 'close', pe_action);
      return false;
    }
    this.text_login = "";
    this.loading = true;
    this.loading_login = true;
    var obj = {
      'address': 6540
      , 'username': this.form2.value.username
      , 'password': this.form2.value.password
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.set_status(res);
          this.recieve_message(false, "", "", 2, "", "");
        }//end if
        else if (res['status'] == 4) {
          this.text_login = "نام کاربری و یا رمز عبور اشتباه می باشد";
          this.loading_login = false;
          this.recieve_message(false, "", "", 1, "", "");
        }//end else
        else {
          this.loading_login = false;
          var pe_message = "نام کاربری و یا رمز عبور معتبر نمیباشد";
          var pe_action = "بستن";
          this.recieve_message(true, '----', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }//end login


  set_status(res: any) {
    var status_remember;
    var obj = {
      user_title: res['result'][0].user_title,
      user_id: res['result'][0].user_id,
      username: res['result'][0].user_username,
      user_token: res['result'][0].user_token,
    };
    if (this.form2.value.remember == true) {
      status_remember = {
        username: this.form2.value.username,
        remember: this.form2.value.remember,
      }
    } else {
      status_remember = {
        username: this.form2.value.username,
        remember: false,
      }
    }
    localStorage.setItem("remember", JSON.stringify(status_remember));
    localStorage.setItem("lang", JSON.stringify(1));
    localStorage.setItem('user_info', JSON.stringify(obj));
    localStorage.setItem('status', '1');
    this.router.navigate(['/home/profile']);
  }


  //**************************************************
  recieve_message(validation: boolean, en_message: string, pe_message: string, type: number, en_action: string, pe_action: string) {
    if (type == 1) this.loading = false;
    if (validation == true) {
      this.matSnackBar.open(pe_message, pe_action, { duration: 5000 });
    }//end if
    else {
      //this.matSnackBar.dismiss();
    }
  }

}
