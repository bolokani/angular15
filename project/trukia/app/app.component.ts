import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from './system/services/server/server.service';
import { filter } from 'rxjs/operators';
declare let gtag: Function;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isOnline: any | undefined;
  public loading = false;
  user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  user_id: number | undefined;
  public subscription: Subscription | any;
  public err: string | undefined; public err_validation: boolean = false;
  public err_internet_text: string | undefined; public err_internet_validation: boolean | undefined;
  public server: any = this.serverService.get_server();
  status: any | undefined;
  user_title: string | undefined;
  format_date: boolean = false;
  title1: string | undefined;
  title2: string | undefined;
  title3: string | undefined;
  logo: string | undefined;


  constructor(public serverService: ServerService, public router: Router, public matSnackBar: MatSnackBar) {
    this.serverService.get_status().subscribe(
      (res) => {
        if (res) {
          this.status = res.status;
          this.user_title = res.user_title;
        }
      }
    )
  }//end consructor

  ngOnInit() {
    this.status = localStorage.getItem("status");
    if (this.user_info) {
      this.user_title = this.user_info.user_title;
    }
    this.setUpAnalytics();
    //this.get_titles();
  }

  setUpAnalytics() {
    /*
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        <any>gtag('config', 'G-NG1DZN17GZ',
          {
            page_path: event.urlAfterRedirects
          }
        );
      }); */
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



  signout() {
    this.serverService.signout();
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

