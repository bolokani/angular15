import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public footer_contact: any;
  public list_footer_content: any = [];

  constructor
    (public serverService: ServerService
      , public router: Router
      , public matSnackBar: MatSnackBar
      , public sanitizer: DomSanitizer,
    ) { }//end consructor

  ngOnInit() {
    this.get_footer_contact();
    this.get_footer_content();
  }

  get_footer_contact() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2154 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.footer_contact = this.sanitizer.bypassSecurityTrustHtml(res['result'][0].site_content_text);
          }
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }

  get_footer_content() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2163 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_footer_content.push(res['result'][i]);
          }
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }


  go_to_content(id: number, title: string) {
    var title_array = title.split(" ");
    var title1: any = '';

    for (var i = 0; i < title_array.length; i++) {
      title1 += title_array[i];
      title1 += "-";
    }
    this.router.navigate(['/content-detaile', id, title1])
  }

  //**************************************************
  message(validation: boolean, en_message: string, pe_message: string, type: number, en_action: string, pe_action: string) {
    if (type == 1) this.loading = false;
    if (validation == true) {
      if (this.lang == 1) this.matSnackBar.open(pe_message, pe_action, { duration: 2000 });
      if (this.lang == 2) this.matSnackBar.open(en_message, en_action, { duration: 2000 });
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