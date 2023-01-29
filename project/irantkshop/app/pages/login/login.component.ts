import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../services/message/message.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public server: any = this.serverService.get_server();
  public status: any = JSON.parse(<any>localStorage.getItem("status"));
  public form1: FormGroup;
  public form2: FormGroup;
  public lang: 1;
  public loading = false;
  public subscription: Subscription;
  public user_id: any;
  public sent_code: boolean = false;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public activatedRoute: ActivatedRoute
    , public messageService: MessageService
    , public dialog: MatDialog) {

    this.create_form();
    this.create_form2();
  }//end consructor

  ngOnInit() {
    if (this.status == 1) {
      ///this.router.navigate(["/home"]);
    };
  }//end ngOnInit
  //************************************
  create_form() {
    this.form1 = new FormGroup({
      'cellphone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,}')]),
    })
  }//end create_form

  create_form2() {
    this.form2 = new FormGroup({
      'code': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,}')]),
    })
  }//end create_form

  check_cellphone(): any {
    if (!this.form1.valid) {
      var pe_message = "فرمت شماره همراه درست نمی باشد.";
      this.message(true, this.messageService.message(1, pe_message, ''), 1, this.messageService.close(1));
      return false;
    }
    this.loading = true;
    var obj = {
      'address': 1989
      , 'cellphone': this.form1.value.cellphone
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.create_code(res['result'][0].user_id);
          }
          else {
            this.create_user();
          }

        }//end if
        else {
          var pe_message = "نام کاربری و یا رمز عبور معتبر نمیباشد";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end check_cellphone


  create_user(): any {
    var obj = {
      address: 1994,
      cellphone: this.form1.value.cellphone
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.create_code(res['result'][0].user_id);
          }
          this.message(false, "", 1, this.messageService.close(1));
        }//end if
        else {
          var pe_message = "خطا در فرآیند ورود | ثبت نام";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )

  }//end create_code

  create_code(user_id: number): any {
    var obj = {
      address: 1991,
      user_id: user_id
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.send_sms(res['result'][0].user_code);
          }
        }//end if
        else {
          var pe_message = "نام کاربری و یا رمز عبور معتبر نمیباشد";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end create_code

  send_sms(code: number) {
    var obj = {
      address: 1990,
      code: code,
      cellphone: this.form1.value.cellphone
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.sent_code = true;
          this.message(false, "", 1, this.messageService.close(1));
        }//end if
        else {
          var pe_message = "نام کاربری و یا رمز عبور معتبر نمیباشد";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  login() {
    var obj = {
      address: 1992,
      code: this.form2.value.code,
      cellphone: this.form1.value.cellphone
    }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.set_status(res);
          this.message(false, "", 1, this.messageService.close(1));
        }//end if
        else {
          var pe_message = "شماره کد وارد شده صحیح نمی باشد.";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }


  set_status(res: any) {
    var obj = {
      user_id: res['result'][0].user_id,
      user_token: res['result'][0].user_token,
    };
    localStorage.setItem("lang", JSON.stringify(1));
    localStorage.setItem('user_info', JSON.stringify(obj));
    this.router.navigate(['/']);
  }
  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) this.loading = false;
    if (validation == true) {
      this.matSnackBar.open(message, action, { duration: 8000 });
    }//end if
    else {
      //this.matSnackBar.dismiss();
    }
  }//end 

}
