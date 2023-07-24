import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../../services/server/server.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../services/message/message.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-membership-detaile2',
  templateUrl: './membership-detaile2.component.html',
  styleUrls: ['./membership-detaile2.component.scss']
})
export class MembershipDetaile2Component implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public user_token: string | undefined;
  public subscription: Subscription;
  public form1: FormGroup;
  public id: number;
  public type_task: number;
  public list_state: any = [];
  public list_city: any = [];
  public result: any;
  public status_info: number;
  public logo_business_card: string = this.serverService.get_default_image();
  public logo_business_card_bin: boolean = false;
  public logo_business_card_info: any;

  public logo_national_card: string = this.serverService.get_default_image();
  public logo_national_card_bin: boolean = false;
  public logo_national_card_info: any;

  public logo_ceo: string = this.serverService.get_default_image();
  public logo_ceo_bin: boolean = false;
  public logo_ceo_info: any;

  public logo_official_newspaper: string = this.serverService.get_default_image();
  public logo_official_newspaper_bin: boolean = false;
  public logo_official_newspaper_info: any;

  public logo_membership: string = this.serverService.get_default_image();
  public logo_membership_bin: boolean = false;
  public logo_membership_info: any;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public messageService: MessageService
    , public matDialogRef: MatDialogRef<MembershipDetaile2Component>
    , @Inject(MAT_DIALOG_DATA) public dialog_data: any
    , public matSnackBar: MatSnackBar) {
    if (dialog_data) {
      this.id = dialog_data.id;
      this.type_task = dialog_data.type_task;
    }
  }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
    }
    this.get_user();
    this.creare_form1();
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
            if (this.type_task == 2) {
              this.get_data();
            } else {
              this.message(false, "", 1, this.messageService.close(this.lang));
            }
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

  creare_form1() {
    this.form1 = new FormGroup({
      'date3': new FormControl(null),
      'tracking_code': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'amount': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'comment': new FormControl(null),
    })
  }

  get_data() {
    this.loading = true;
    var obj = { address: 6943, user_id: this.user_id, user_token: this.user_token, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.form1.patchValue({
              'date3': res['result'][0].site_membership_date3,
              'tracking_code': res['result'][0].site_membership_tracking_code,
              'amount': res['result'][0].site_membership_amount,
              'comment': res['result'][0].site_membership_comment,
            })
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
          this.result = res['result'][0];
        }//end iff
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  save() {
    if (this.type_task == 1) {
      this.insert();
    }
    else if (this.type_task == 2) {
      this.update();
    }
  }

  insert() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 6946
      , user_id: this.user_id
      , date3: this.form1.value.date3
      , tracking_code: this.form1.value.tracking_code
      , amount: this.form1.value.amount
      , comment: this.form1.value.comment
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.matDialogRef.close(res['result'][0]);
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  update() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 6944
      , user_id: this.user_id
      , id: this.id
      , date3: this.form1.value.date3
      , tracking_code: this.form1.value.tracking_code
      , amount: this.form1.value.amount
      , comment: this.form1.value.comment
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.matDialogRef.close(res['result'][0]);
          }
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