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
  public user_token: string | undefined;
  public subscription: Subscription;
  public update_form1: FormGroup;
  public id: number;
  public list_state: any = [];

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
      this.user_token = this.user_info.user_token;
    }
    this.creare_form1();
    this.get_user_info();
    this.get_state();
  }

  creare_form1() {
    this.update_form1 = new FormGroup({
      'title': new FormControl(null),
      'type': new FormControl(null),
      'national_id': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'rnumber': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'economic_code': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'ceo': new FormControl(null),
      'national_code_ceo': new FormControl(null, [Validators.pattern('[0-9]{1,10}')]),
      'cellphone2': new FormControl(null, [Validators.pattern('[0-9]{1,11}')]),
      'email': new FormControl(null, [Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      'work_place': new FormControl(null),
      'adress': new FormControl(null),
      'code_posti': new FormControl(null, [Validators.pattern('[0-9]{1,10}')]),
      'comment': new FormControl(null),
      'phone': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'date_registeration': new FormControl(null),
      'birth_date': new FormControl(null),
      'state': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
    })
  }

  get_user_info() {
    var obj = { address: 6904, user_id: this.user_id, user_token: this.user_token }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.update_form1.patchValue({
              'title': res['result'][0].site_company_title,
              'national_id': res['result'][0].site_company_national_id,
              'economic_code': res['result'][0].site_company_economic_code,
              'rnumber': res['result'][0].site_company_rnumber,
              'date_registeration': res['result'][0].site_company_date_registeration,
              'ceo': res['result'][0].site_company_ceo,
              'national_code_ceo': res['result'][0].site_company_national_code_ceo,
              'birth_date': res['result'][0].site_company_birth_date,
              'cellphone2': res['result'][0].site_company_cellphone2,
              'phone': res['result'][0].site_company_phone,
              'adress': res['result'][0].site_company_adress,
              'code_posti': res['result'][0].site_company_code_posti,
              'email': res['result'][0].site_company_email,
              'work_place': res['result'][0].site_company_work_place,
              'state': res['result'][0].site_company_state,
            })
            this.id = res['result'][0].site_company_id;
          } else {
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
    if (this.id > 0) {
      this.update();
    } else {
      this.insert();
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
      address: 6905
      , user_id: this.user_id
      , token: this.user_token
      , title: this.update_form1.value.title
      , national_id: this.update_form1.value.national_id
      , economic_code: this.update_form1.value.economic_code
      , rnumber: this.update_form1.value.rnumber
      , date_registeration: this.update_form1.value.date_registeration
      , ceo: this.update_form1.value.ceo
      , national_code_ceo: this.update_form1.value.national_code_ceo
      , birth_date: this.update_form1.value.birth_date
      , cellphone2: this.update_form1.value.cellphone2
      , phone: this.update_form1.value.phone
      , adress: this.update_form1.value.adress
      , code_posti: this.update_form1.value.code_posti
      , email: this.update_form1.value.email
      , work_place: this.update_form1.value.work_place
      , state: this.update_form1.value.state
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.matDialogRef.close(res['result'][0]);
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

  update() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 6906
      , user_id: this.user_id
      , id: this.id
      , token: this.user_token
      , title: this.update_form1.value.title
      , national_id: this.update_form1.value.national_id
      , economic_code: this.update_form1.value.economic_code
      , rnumber: this.update_form1.value.rnumber
      , date_registeration: this.update_form1.value.date_registeration
      , ceo: this.update_form1.value.ceo
      , national_code_ceo: this.update_form1.value.national_code_ceo
      , birth_date: this.update_form1.value.birth_date
      , cellphone2: this.update_form1.value.cellphone2
      , phone: this.update_form1.value.phone
      , adress: this.update_form1.value.adress
      , code_posti: this.update_form1.value.code_posti
      , email: this.update_form1.value.email
      , work_place: this.update_form1.value.work_place
      , state: this.update_form1.value.state
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

  get_state() {
    var obj = { address: 6908 }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_state.push(res['result'][i]);
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