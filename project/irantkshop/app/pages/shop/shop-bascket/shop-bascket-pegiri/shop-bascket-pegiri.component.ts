import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../../services/server/server.service';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-shop-bascket-pegiri',
  templateUrl: './shop-bascket-pegiri.component.html',
  styleUrls: ['./shop-bascket-pegiri.component.css']
})
export class ShopBascketPegiriComponent implements OnInit, OnDestroy {
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info = JSON.parse(<any>localStorage.getItem('user_info'));
  public server: any = this.serverService.get_server();
  public status: any = JSON.parse(<any>localStorage.getItem('status'));
  public loading = false;
  public subscription: Subscription;
  public user_id: any;
  public list_product: any = [];
  public code: number;
  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService) { }//end consructor

  ngOnInit() {
    this.serverService.send_stepper_index(2);

    if (this.user_info) {
      this.user_info.user_id;
    }
    //this.serverService.send_bascket_step(3);
    //this.update();
  }

  update() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    //this.serverService.send_loading(true);
    this.subscription = this.serverService.post_address(this.server, 'new_address', { 'user_id': this.user_id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['result'].changedRows > 0) {
            this.code = res['code'];
          } else {
            this.code = 0;
          }
          //this.serverService.send_count_bascket(0);
          res['result'].type = 0;
          //this.serverService.send_list_bascket(res['result']);
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end update
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






