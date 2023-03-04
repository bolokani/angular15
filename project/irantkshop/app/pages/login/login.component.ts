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
  public user_info: any = JSON.parse(<any>localStorage.getItem("user_info"));
  public token_order: any = JSON.parse(<any>localStorage.getItem("token_order"));
  public form1: FormGroup;
  public form2: FormGroup;
  public form3: FormGroup;
  public lang: 1;
  public loading = false;
  public subscription: Subscription;
  public user_id: any;
  public id: any;
  public sent_code: boolean = false;
  public show_input_name: boolean = false;
  public need_to_validation: boolean = false;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public activatedRoute: ActivatedRoute
    , public messageService: MessageService
    , public dialog: MatDialog) {
    this.create_form();
    this.create_form2();
    this.create_form3();
  }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.get_user(this.user_info.user_id, this.user_info.user_token);
    } else {
      this.need_to_validation = true;
      this.serverService.set_metas('فروشگاه اینترنتی ایران تعمیرکار', 'فروشگاه اینترنتی ایران تعمیرکار', '');
    }
  }//end ngOnInit

  get_user(user_id: number, user_token: string) {
    var obj = {
      address: 2006,
      user_id: user_id,
      user_token: user_token,
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.router.navigate(["/shopping/bascket"]);
          } else {
            this.need_to_validation = true;
          }
          this.message(false, "", 1, this.messageService.close(1));
        }//end if
        else {
          var pe_message = "خطا در فرآیند ورود | ثبت نام";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }
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
  }//end create_form2


  create_form3() {
    this.form3 = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
    })
  }//end create_form2

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

  get_code() {
    if (String(this.form2.value.code).length == 5) {
      this.login();
    }
  }

  login() {
    var obj = {
      address: 1992,
      code: this.form2.value.code,
      cellphone: '09039812978'
    }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          if (res['result'][0].user_title) {
            if (this.token_order) {
              this.update_order(res['result'][0].user_id, res);
            } else {
              this.set_status(res);
            }
          } else {
            this.id = res['result'][0].user_id;
            this.show_input_name = true;
          }

          this.message(false, "", 1, this.messageService.close(1));
        }//end if
        else {
          var pe_message = "شماره کد وارد شده صحیح نمی باشد.";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  login_form3() {
    var obj = {
      address: 2028,
      code: this.form2.value.code,
      cellphone: '09039812978',
      name: this.form3.value.name
      , id: this.id
    }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          if (this.token_order) {
            this.update_order(res['result'][0].user_id, res);
          } else {
            this.set_status(res);
          }
          this.message(false, "", 1, this.messageService.close(1));
        }//end if
        else {
          var pe_message = "شماره کد وارد شده صحیح نمی باشد.";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  update_order(user_id: number, result: any) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = { address: 2007, user_id: user_id, token_order: this.token_order }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.set_status(result);
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
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
