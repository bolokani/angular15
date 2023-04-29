import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { BrowserModule, DomSanitizer, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public isOnline: any | undefined;
  public loading = false;
  user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  user_id: number | undefined;
  public subscription: Subscription | any;
  public err: string | undefined; public err_validation: boolean = false;
  public err_internet_text: string | undefined; public err_internet_validation: boolean | undefined;
  public server: any = this.serverService.get_server();
  public title: string | undefined;
  public text: any | undefined;

  constructor(public serverService: ServerService, public router: Router, public matSnackBar: MatSnackBar
    , public sanitizer: DomSanitizer) { }//end consructor

  ngOnInit() {
    this.get_content();
  }

  get_content() {
    if (this.serverService.check_internet() == false) {
      var pe_message = "خطا در اینترنت";
      var pe_action = "بستن";
      this.recieve_message(true, 'Erorr in Internet', pe_message, 1, 'close', pe_action);
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2087, id: 53 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.title = res['result'][0].site_content_title;
          this.text = this.sanitizer.bypassSecurityTrustHtml(res['result'][0].site_content_text);
          this.serverService.set_metas(this.title, this.title, '', '');
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