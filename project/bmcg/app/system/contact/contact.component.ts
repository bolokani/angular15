import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  public isOnline: any | undefined;
  public loading = false;
  user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  user_id: number | undefined;
  public subscription: Subscription | any;
  public err: string | undefined; public err_validation: boolean = false;
  public err_internet_text: string | undefined; public err_internet_validation: boolean | undefined;
  public server: any = this.serverService.get_server();
  public title1: any;
  title: string | undefined;
  id: number | undefined;
  dataSource: any;
  columns: any = ['row', 'title', 'sender', 'commnet'];
  logo: string | undefined;
  public form1: FormGroup | any;
  status: any = JSON.parse(<any>localStorage.getItem('status'));

  watsup: string | undefined;
  linkin: string | undefined;
  facebook: string | undefined;
  telegram: string | undefined;
  instagram: string | undefined;

  constructor(public serverService: ServerService, public router: Router
    , public matSnackBar: MatSnackBar
    , private dialog: MatDialog
    , private activatedRoute: ActivatedRoute) {

  }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    this.serverService.top();
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.id = params['id'];
          this.get_metas(params['id']);
        }
      }
    )
    this.get_access();
    this.get_titles();
    this.get_social();
    this.create_form();
  }

  get_access() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1984, id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['result'][0].menu_site_status != 1) {
            this.router.navigate(['/not-found']);
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
  }

  get_social() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1994 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            if (res['result'][0].watsup) this.watsup = res['result'][0].watsup;
            if (res['result'][0].linkdin) this.linkin = res['result'][0].linkdin;
            if (res['result'][0].facebook) this.facebook = res['result'][0].facebook;
            if (res['result'][0].telegram) this.telegram = res['result'][0].telegram;
            if (res['result'][0].instagram) this.instagram = res['result'][0].instagram;
            res['result'][0].menu_site_tab_title
          }
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.recieve_message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }

  get_metas(id: number) {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1869, id: id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.serverService.set_metas(res['result'][0].menu_site_tab_title, res['result'][0].menu_site_keywords, res['result'][0].menu_site_comment, '');
          }
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.recieve_message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }


  create_form() {
    this.form1 = new FormGroup({
      'user_title': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      'subject': new FormControl(null, [Validators.required]),
      'comment': new FormControl(null, [Validators.required]),
    });
    if (this.status == 1) {
      this.form1.controls['user_title'].disable();
      this.form1.controls['email'].disable();
    }
    if (this.status == 1) {
      this.get_user();
    }
  }

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

  get_user() {
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1809, user_id: this.user_id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.form1.patchValue({
              'user_title': res['result'][0].user_title,
              'email': res['result'][0].user_email,
            })
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
  }

  save(): any {
    if (!this.form1.valid) {
      return false;
    }
    if (this.status == 1) var type_user = 1;
    else type_user = 2;
    this.loading = true;
    var obj = {
      'address': 1810,
      'comment': this.form1.value.comment,
      'user_title': this.form1.value.user_title,
      'email': this.form1.value.email,
      'subject': this.form1.value.subject,
      'user_id': this.user_id,
      'type_user': type_user
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          var pe_message = "پیام شما با موفقیت ارسال شد";
          var pe_action = "بستن";
          this.recieve_message(true, 'Erorr in Save', pe_message, 1, 'close', pe_action);
          this.form1.patchValue({
            'subject': null,
            'comment': null
          })
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

