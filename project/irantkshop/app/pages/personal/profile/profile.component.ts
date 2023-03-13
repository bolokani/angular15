import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public loading = false;
  user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  user_id: number | undefined;
  public subscription: Subscription | any;
  public err: string | undefined; public err_validation: boolean = false;
  public err_internet_text: string | undefined; public err_internet_validation: boolean | undefined;
  public server: any = this.serverService.get_server();
  count_free: number = 0;
  count_course: number = 0;
  count_accounting: number = 0;
  logo: string | undefined;
  cellphone: number | undefined;
  title: number | undefined;
  logo_info: any | undefined;


  constructor(public serverService: ServerService, public router: Router, public matSnackBar: MatSnackBar) {
    this.serverService.get_count_course().subscribe(
      (res) => {
        this.get_count();
      }
    )

    this.serverService.get_user().subscribe(
      (res) => {
        this.get_user();
      }
    )
  }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    this.get_count();
    this.get_user();

  }

  get_user() {
    if (this.serverService.check_internet() == false) {
      var pe_message = "خطا در اینترنت";
      var pe_action = "بستن";
      this.recieve_message(true, 'Erorr in Internet', pe_message, 1, 'close', pe_action);
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2027, user_id: this.user_id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            if (res['result'][0].user_logo3) {
              this.logo = res['result'][0].user_logo_site + "/" + res['result'][0].user_logo3;
            } else {
              this.logo = this.serverService.get_default_user_logo();
            }
          }
          this.title = res['result'][0].user_title;
          this.cellphone = res['result'][0].user_cellphone;

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

  change_avater3(event: any) {
    var selectedFile = <File>event.target.files[0];
    var fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    this.serverService.post_address_file(this.server, "uploadImage3", fd).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          //this.uploadedAvaterProgess3 = (event.loaded / event.total) * 100;
        }
        else if (event.type === HttpEventType.Response) {
          var a = <any>event.body;
          this.logo = this.serverService.get_site() + "/" + this.serverService.get_path_upload_image() + a.result.filename;
          this.logo_info = {
            'site': this.serverService.get_site(),
            'path': this.serverService.get_path_upload_image() + a.result.filename
          }
          this.save_logo();
        }
      }
    )
  }

  save_logo() {
    if (this.serverService.check_internet() == false) {
      var pe_message = "خطا در اینترنت";
      var pe_action = "بستن";
      this.recieve_message(true, 'Erorr in Internet', pe_message, 1, 'close', pe_action);
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2046, user_id: this.user_id, logo_info: this.logo_info }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
        }//end if
        else {
          var pe_message = "خطا در ذخیره";
          var pe_action = "بستن";
          this.recieve_message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }

  delete_logo3() {
    if (this.serverService.check_internet() == false) {
      var pe_message = "خطا در اینترنت";
      var pe_action = "بستن";
      this.recieve_message(true, 'Erorr in Internet', pe_message, 1, 'close', pe_action);
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 2038,
      user_id: this.user_id,
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.count_free = res['result'][0].count_free;
          this.count_course = res['result'][0].count_course;
          this.count_accounting = res['result'][0].count_accounting;
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


  get_count() {
    if (this.serverService.check_internet() == false) {
      var pe_message = "خطا در اینترنت";
      var pe_action = "بستن";
      this.recieve_message(true, 'Erorr in Internet', pe_message, 1, 'close', pe_action);
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2038, user_id: this.user_id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.count_free = res['result'][0].count_free;
          this.count_course = res['result'][0].count_course;
          this.count_accounting = res['result'][0].count_accounting;
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
