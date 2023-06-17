import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MessageService } from '../../services/message/message.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contract-comment',
  templateUrl: './contract-comment.component.html',
  styleUrls: ['./contract-comment.component.scss']
})
export class ContractCommentComponent implements OnInit, OnDestroy {
  public server: any = this.serverService.get_server();
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public loading = false;
  public subscription: Subscription | any;
  public site: any;
  public contract_number: number | any;
  public username: any;
  public user_id: any;
  public user_token: any;
  public placeholder: string | any;
  public show_excel: boolean = false;
  public list_comment: any = [];
  public id: number | any;
  public comment_text: any;
  public export_code: any;
  public form1: FormGroup | any;
  public disable1: boolean = true;
  public user_title: string;



  constructor(
    public serverService: ServerService
    , public router: Router
    , public activatedRoute: ActivatedRoute
    , public dialog: MatDialog
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
  ) {
  }//end consructor

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
    }
    this.create_form();
    this.get_user();
    this.get_contract();
  }

  create_form() {
    this.form1 = new FormGroup({
      'comment': new FormControl(null),
    })
  }

  enable_cursor() {
    this.disable1 = true;
  }

  scroll() {
    /*
    const config: ScrollToConfigOptions = {
      target: 'bottom',
      offset: -20
    };
    this._scrollToService.scrollTo(config);
    */
  }

  get_contract() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6882, id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.contract_number = res['result'][0].contract_list_contract_number;
            this.user_title = res['result'][0].user_title;
          }
          this.message(false, "", 1, this.messageService.close(1));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(1), 1, this.messageService.close(1));
        }
      }
    )
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
            this.get_comments();
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

  get_comments() {
    this.show_excel = false;
    var obj = {
      'address': 6561
      , 'id': this.id
      , 'user_token': this.user_token
      , 'user_id': this.user_id
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_comment = [];
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].user_logo) {
              res['result'][i].logo = res['result'][i].user_logo_site + "/" + res['result'][i].user_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_user_logo();
            }
            console.log(res['result'][i].logo)
            this.list_comment.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if this.data['status'] == 1
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }//end else
      }//end res
    )//end
  }//comment

  send_comment(id: number) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = { 'address': 6562, 'id': id, 'comment': this.form1.value.comment, 'user_id': this.user_id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.comment_text = "";
          this.show_excel = false;
          res['result'][0].comment = res['result'][0].contract_comment_comment;
          if (res['result'][0].user_logo) {
            res['result'][0].logo = res['result'][0].user_logo_site + "/" + res['result'][0].user_logo;
          } else {
            res['result'][0].logo = this.serverService.get_default_user_logo();
          }
          this.list_comment.push(res['result'][0])
          this.message(false, "", 1, this.messageService.close(this.lang));
          this.form1.patchValue({
            'comment': null
          })
        }//end if this.data['status'] == 1
        else {
          this.message(true, this.messageService.erorr_in_save(this.lang), 1, this.messageService.close(this.lang));
        }//end else
      }//end res
    )//end
  }//end menufiledelete

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


