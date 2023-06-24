import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { identity, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonalInfoDetaileComponent } from '../personal-info-detaile/personal-info-detaile.component';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public loading_update: boolean = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public form1: FormGroup;
  public token: number;
  public user_title: String;
  public user_cellphone: String;
  public user_watsup: String;
  public user_phone: String;
  public user_code_meli: String;
  public user_id_number: String;
  public user_birth_date: String;
  public user_address: String;
  public user_code_posti: number;
  public user_token: number;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public dialog: MatDialog
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute) {



  }//end consructor

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.token = params['token'];
        if (this.token) {
          this.get_user();
        }
      }
    )

    this.create_form();
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
      this.get_user();
    }
  }

  get_user() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    var obj = {
      address: 6876,
      user_id: this.user_id,
      user_token: this.user_token
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.get_user_info();
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

  get_user_info() {
    var obj = { address: 6541, user_id: this.user_id, token: this.token }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.user_title = res['result'][0].user_title;
            this.user_cellphone = res['result'][0].user_cellphone;
            this.user_watsup = res['result'][0].user_watsup;
            this.user_phone = res['result'][0].user_phone;
            this.user_code_meli = res['result'][0].user_code_meli;
            this.user_id_number = res['result'][0].user_id_number;
            this.user_birth_date = res['result'][0].user_birth_date;
            this.user_code_posti = res['result'][0].user_code_posti;
            this.user_address = res['result'][0].user_address;
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  create_form() {
    this.form1 = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'cellphone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,}'), Validators.minLength(11)]),
      'watsup': new FormControl(null, [Validators.pattern('[0-9]{1,}'), Validators.minLength(11)]),
      'birth_date': new FormControl(null),
      'phone': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'code_meli': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'id_number': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'code_posti': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'address': new FormControl(null),
    })
  }

  open() {
    const dialogRef = this.dialog.open(PersonalInfoDetaileComponent, {
      width: '24rem',
      height: 'auto',
      hasBackdrop: true,
      data: { user_id: this.user_id }
    });
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.user_title = res.user_title;
          this.user_cellphone = res.user_cellphone;
          this.user_code_meli = res.user_code_meli;
          this.user_watsup = res.user_watsup;
          this.user_phone = res.user_phone;
          this.user_id_number = res.user_id_number;
          this.user_birth_date = res.user_birth_date;
          this.user_code_posti = res.user_code_posti;
          this.user_code_meli = res.user_code_meli;
          this.user_address = res.user_address;
        }
      }
    )
  }
  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) {
      this.loading_update = false;
      this.loading = false;
    }
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

