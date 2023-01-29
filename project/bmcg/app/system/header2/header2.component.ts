import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '..//services/message/message.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public status: any = JSON.parse(<any>localStorage.getItem('status'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number;
  public subscription: Subscription;
  public id: number = 0;
  public user_title: string;
  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService) {
    this.serverService.get_status().subscribe(
      (res) => {
        if (res) {
          this.status = res.status;
          this.user_title = res.user_title;
        }
      }
    )
    //this.get_titles();
  }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_title = this.user_info.user_title;
    }
  }

  signout() {
    this.serverService.signout();
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
  //*******************************************************************************
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }//end if
  }//end OnDestroy
}

