import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '../services/message/message.service';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-content-detaile',
  templateUrl: './content-detaile.component.html',
  styleUrls: ['./content-detaile.component.scss']
})
export class ContentDetaileComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public comment: any | undefined;
  public title: string;
  public id: number;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public sanitizer: DomSanitizer
    , public activatedRoute: ActivatedRoute
    , public messageService: MessageService
    , public matSnackBar: MatSnackBar) { }//end consructor

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.get_content();
      }
    )
  }

  get_content() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2042, id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.title = res['result'][0].site_content_title;
          this.comment = this.sanitizer.bypassSecurityTrustHtml(res['result'][0].site_content_comment);
          this.serverService.set_metas(this.title, this.title, '')
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_content
  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) this.loading = false;
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