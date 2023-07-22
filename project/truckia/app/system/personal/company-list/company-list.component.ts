import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MessageService } from '../../services/message/message.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CompanyDetaile2Component } from '../company-detaile2/company-detaile2.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public user_token: number | undefined;
  public subscription: Subscription;
  public list_company: any = [];
  public company_id: number;
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
                this.get_company();
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
    this.company_id = id;
  }

  get_company() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6909, user_id: this.user_id }).subscribe(
      (res: any) => {
        this.list_company = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].site_company_logo_ceo) {
              res['result'][i].logo = res['result'][i].site_company_logo_site + "/" + res['result'][i].site_company_logo_ceo;
            } else {
              res['result'][i].logo = this.serverService.get_default_image();
            }
            this.list_company.push(res['result'][i]);
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
    const dialogRef = this.dialog.open(CompanyDetaile2Component, {
      width: '50rem',
      height: 'auto',
      hasBackdrop: true,
      data: { user_id: this.user_id, type_task: type_task, id: id, status_info: this.status_info }
    });
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          if (type_task == 1) {
            if (res.site_company_logo_ceo) {
              res.logo = res.site_company_logo_site + "/" + res.site_company_logo_ceo;

            }
            else {
              res.logo = this.serverService.get_default_image();
            }
            this.list_company.unshift(res)
            this.serverService.send_count_company({});
          } else {
            this.list_company[i].site_company_title = res.site_company_title;
            this.list_company[i].company_type_title = res.company_type_title;
            this.list_company[i].site_company_ceo = res.site_company_ceo;
            this.list_company[i].site_company_national_id = res.site_company_national_id;
            this.list_company[i].site_company_economic_code = res.site_company_economic_code;
            this.list_company[i].site_company_rnumber = res.site_company_rnumber;
            this.list_company[i].site_company_date_registeration = res.site_company_date_registeration;
            if (res.site_company_logo_ceo) {
              this.list_company[i].logo = res.site_company_logo_site + "/" + res.site_company_logo_ceo;

            } else {
              this.list_company[i].logo = this.serverService.get_default_image();
            }
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
      this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6913, id: id }).subscribe(
        (res: any) => {
          if (res['status'] == 1) {
            this.list_company.splice(i, 1);
            this.serverService.send_count_company({});
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