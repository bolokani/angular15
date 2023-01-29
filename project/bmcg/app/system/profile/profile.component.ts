import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { identity, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public loading_update: boolean = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public form1: FormGroup;
  public token: number;
  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute) {



  }//end consructor

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.token = params['token'];
        if (this.token) {
          this.get_user();
        }
      }
    )

    this.create_form();
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      if (!this.token) this.get_user();
    }
  }

  get_user() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = { address: 6541, user_id: this.user_id, token: this.token }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.form1.patchValue({
              'name': res['result'][0].user_title,
              'cellphone': res['result'][0].user_cellphone,
              'email': res['result'][0].user_email,
              'watsup': res['result'][0].user_watsup,
              'code_meli': res['result'][0].user_code_meli,
            })
          }

          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }


  update() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    var obj = {
      address: 6542, user_id: this.user_id,
      'name': this.form1.value.name,
      'cellphone': this.form1.value.cellphone,
      'watsup': this.form1.value.watsup,
      'email': this.form1.value.email,
      'code_meli': this.form1.value.code_meli,
    }
    this.loading_update = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.serverService.send_user();
          this.message(true, this.messageService.save(this.lang), 1, this.messageService.close(this.lang));
        }//end if
        else if (res['status'] == 4) {
          var pe_message = "شماره همراه یا کد ملی  قبلا در سیستم ثبت شده است";
          this.message(true, this.messageService.message(this.lang, pe_message, ""), 1, this.messageService.close(this.lang));
        }
        else {
          this.message(true, this.messageService.erorr_in_save(this.lang), 1, this.messageService.close(this.lang));

        }
      }
    )
  }

  create_form() {
    this.form1 = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'cellphone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,}'), Validators.minLength(11)]),
      'watsup': new FormControl(null, [Validators.pattern('[0-9]{1,}'), Validators.minLength(11)]),
      'code_meli': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'email': new FormControl(null, [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    })
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

