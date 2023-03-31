import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-personal-address',
  templateUrl: './personal-address.component.html',
  styleUrls: ['./personal-address.component.scss']
})
export class PersonalAddressComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public form1: FormGroup;
  public id: number;
  public type_task: number;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public messageService: MessageService
    , public matDialogRef: MatDialogRef<PersonalAddressComponent>
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
    }
    this.creare_form1();
    if (this.type_task == 2) this.get_address();
  }

  creare_form1() {
    this.form1 = new FormGroup({
      'city': new FormControl(null, [Validators.required]),
      'code_posti': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'cellphone': new FormControl(null, [Validators.pattern('[0-9]{1,}'), Validators.required]),
      'transferee': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
    })
  }

  get_address() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2075, id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.form1.patchValue({
              city: res['result'][0].user_address_city,
              code_posti: res['result'][0].user_address_code_posti,
              address: res['result'][0].user_address_address,
              transferee: res['result'][0].user_address_transferee,
              cellphone: res['result'][0].user_address_cellphone,
            })
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
    if (this.type_task == 1) {
      this.insert();
    } else {
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
      address: 2072
      , user_id: this.user_id
      , city: this.form1.value.city
      , code_posti: this.form1.value.code_posti
      , address1: this.form1.value.address
      , cellphone: this.form1.value.cellphone
      , transferee: this.form1.value.transferee
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
      address: 2076
      , user_id: this.user_id
      , id: this.id
      , city: this.form1.value.city
      , code_posti: this.form1.value.code_posti
      , address1: this.form1.value.address
      , cellphone: this.form1.value.cellphone
      , transferee: this.form1.value.transferee
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