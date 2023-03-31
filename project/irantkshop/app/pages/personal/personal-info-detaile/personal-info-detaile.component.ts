import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-personal-info-detaile',
  templateUrl: './personal-info-detaile.component.html',
  styleUrls: ['./personal-info-detaile.component.scss']
})
export class PersonalInfoDetaileComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public update_form1: FormGroup;
  public id: number;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public messageService: MessageService
    , public matDialogRef: MatDialogRef<PersonalInfoDetaileComponent>
    , @Inject(MAT_DIALOG_DATA) public dialog_data: any
    , public matSnackBar: MatSnackBar) {
    if (dialog_data) {
      this.id = dialog_data.id;
    }
  }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    this.creare_form1();
    this.get_user();
  }

  creare_form1() {
    this.update_form1 = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'code_meli': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'email': new FormControl(null, [Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      'cellphone': new FormControl(null),
    })
  }

  get_user() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2071, user_id: this.user_id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.update_form1.patchValue({
              name: res['result'][0].user_title,
              code_meli: res['result'][0].user_code_meli,
              email: res['result'][0].user_email,
              cellphone: res['result'][0].user_cellphone,
            })
          } else {
            this.router.navigate(['/login']);
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  save() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 2070
      , user_id: this.user_id
      , name: this.update_form1.value.name
      , code_meli: this.update_form1.value.code_meli
      , email: this.update_form1.value.email
      , cellphone: this.update_form1.value.cellphone
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.matDialogRef.close(res['result'][0]);
          }
          else {
            this.router.navigate(['/login']);
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