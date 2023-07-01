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
  public token: string | undefined;
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
      this.token = this.user_info.user_token;
    }
    this.creare_form1();
    this.get_user();
  }

  creare_form1() {
    this.update_form1 = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'cellphone': new FormControl({ value: null, disabled: true }, [Validators.pattern('[0-9]{1,}'), Validators.required]),
      'code_meli': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'watsup': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'phone': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'id_number': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'birth_date': new FormControl(null),
      'code_posti': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'addres': new FormControl(null),
    })
  }

  get_user() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 6873
      , userId: this.user_id
      , token: this.token
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.update_form1.patchValue({
              title: res['result'][0].user_title,
              code_meli: res['result'][0].user_code_meli,
              email: res['result'][0].user_email,
              cellphone: res['result'][0].user_cellphone,
              watsup: res['result'][0].user_watsup,
              phone: res['result'][0].user_phone,
              id_number: res['result'][0].user_id_number,
              birth_date: res['result'][0].user_birth_date,
              code_posti: res['result'][0].user_code_posti,
              addres: res['result'][0].user_address,
            })
          } else {
            //this.router.navigate(['/login']);
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
      address: 6542
      , user_id: this.user_id
      , token: this.token
      , title: this.update_form1.value.title
      , code_meli: this.update_form1.value.code_meli
      , watsup: this.update_form1.value.watsup
      , phone: this.update_form1.value.phone
      , id_number: this.update_form1.value.id_number
      , birth_date: this.update_form1.value.birth_date
      , code_posti: this.update_form1.value.code_posti
      , addres: this.update_form1.value.addres
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.matDialogRef.close(res['result'][0]);
          }
          else {
            //this.router.navigate(['/login']);
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else if (res['status'] == 4) {
          var message = "این کد ملی و یا شماره همراه قبلا استفاده شده است.";
          this.message(true, this.messageService.message(this.lang, message, ''), 1, this.messageService.close(this.lang));
        }
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