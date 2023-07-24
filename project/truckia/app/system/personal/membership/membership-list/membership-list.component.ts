import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../../services/server/server.service';
import { MessageService } from '../../../services/message/message.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MembershipDetaile2Component } from '../membership-detaile2/membership-detaile2.component';

@Component({
  selector: 'app-membership-list',
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.scss']
})
export class MembershipListComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public user_token: number | undefined;
  public subscription: Subscription;
  public list_membership: any = [];
  public membership_id: number;
  public status_info: number;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute
    , public dialog: MatDialog
    , public matSnackBar: MatSnackBar) { }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id
      this.user_token = this.user_info.user_token
    }
    var title = "شرکت های  من";
    this.serverService.set_metas(title, title, '', 'mohammad zamani');
    this.get_user();

  }

  get_user() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 6876,
      user_id: this.user_id,
      user_token: this.user_token
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.status_info = res['result'][0].user_status_info;
            this.activatedRoute.params.subscribe(
              (params: Params) => {
                this.get_membership();
              }
            )
          } else {
            this.serverService.signout();
            this.message(false, "", 1, this.messageService.close(this.lang));
          }
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_bg(id: number) {
    this.membership_id = id;
  }

  get_membership() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6940, user_id: this.user_id }).subscribe(
      (res: any) => {
        this.list_membership = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_membership.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  open(i: number, type_task: number, id: number) {
    const dialogRef = this.dialog.open(MembershipDetaile2Component, {
      width: '22rem',
      height: 'auto',
      hasBackdrop: true,
      data: { user_id: this.user_id, type_task: type_task, id: id, status_info: this.status_info }
    });
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          if (type_task == 1) {
            this.list_membership.unshift(res)
            //this.serverService.send_count_company({});
          } else {
            this.list_membership[i].site_membership_tracking_code = res.site_membership_tracking_code;
            this.list_membership[i].site_membership_date3 = res.site_membership_date3;
            this.list_membership[i].site_membership_amount = res.site_membership_amount;
            this.list_membership[i].membership_status_title = res.membership_status_title;
          }
        }
      }
    )
  }

  delete(i: number, id: number) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    var confirm_delete = window.confirm(this.messageService.message_delete_accept(this.lang));
    if (confirm_delete == true) {
      this.loading = true;
      this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6945, id: id }).subscribe(
        (res: any) => {
          if (res['status'] == 1) {
            this.list_membership.splice(i, 1);
            //this.serverService.send_count_company({});
            this.message(false, "", 1, this.messageService.close(this.lang));
          }//end if
          else {
            this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
          }
        }
      )
    }

  }
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