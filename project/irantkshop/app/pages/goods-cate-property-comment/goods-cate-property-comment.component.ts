import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../services/message/message.service';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-goods-cate-property-comment',
  templateUrl: './goods-cate-property-comment.component.html',
  styleUrls: ['./goods-cate-property-comment.component.scss']
})

export class GoodsCatePropertyCommentComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public id: number | undefined;
  public comment: any | undefined;
  public title: string | undefined;
  public subscription: Subscription;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public sanitizer: DomSanitizer
    , public messageService: MessageService
    , @Inject(MAT_DIALOG_DATA) public dialog_data: any
    , public matDialogRef: MatDialogRef<GoodsCatePropertyCommentComponent>
    , public matSnackBar: MatSnackBar) {
    if (dialog_data) {
      this.id = dialog_data.id;
      this.title = dialog_data.title;
    }
  }//end consructor

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2313, id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.comment = this.sanitizer.bypassSecurityTrustHtml(res['result'][0].wharehouse_cate_property_comment);
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  close() {
    this.matDialogRef.close();
  }
  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) this.loading = false;
    if (validation == true) {
      this.matSnackBar.open(message, action, { duration: 3000 });
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