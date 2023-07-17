import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message/message.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-company-detaile2',
  templateUrl: './company-detaile2.component.html',
  styleUrls: ['./company-detaile2.component.scss']
})
export class CompanyDetaile2Component implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public user_token: string | undefined;
  public subscription: Subscription;
  public update_form1: FormGroup;
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
    , public matDialogRef: MatDialogRef<CompanyDetaile2Component>
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
              this.get_state();
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
    this.update_form1 = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'national_id': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'rnumber': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'economic_code': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'ceo': new FormControl(null),
      'national_code_ceo': new FormControl(null, [Validators.pattern('[0-9]{1,10}')]),
      'cellphone': new FormControl(null, [Validators.pattern('[0-9]{1,11}')]),
      'cellphone2': new FormControl(null, [Validators.pattern('[0-9]{1,11}')]),
      'email': new FormControl(null, [Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      'adress': new FormControl(null),
      'code_posti': new FormControl(null, [Validators.pattern('[0-9]{1,10}')]),
      'comment': new FormControl(null),
      'phone': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'date_registeration': new FormControl(null),
      'birth_date': new FormControl(null),
      'state': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'city': new FormControl(null, [Validators.pattern('[0-9]{1,}')]),
      'type': new FormControl(2, [Validators.pattern('[0-9]{1,}')]),
    })
  }

  get_data() {
    this.loading = true;
    var obj = { address: 6904, user_id: this.user_id, user_token: this.user_token, id: this.id }
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
              'cellphone': res['result'][0].site_company_cellphone,
              'cellphone2': res['result'][0].site_company_cellphone2,
              'phone': res['result'][0].site_company_phone,
              'adress': res['result'][0].site_company_adress,
              'code_posti': res['result'][0].site_company_code_posti,
              'email': res['result'][0].site_company_email,
              'type': res['result'][0].site_company_type,
            })
          }
          this.logo_business_card_info = {
            site: res['result'][0].site_company_site,
            path: res['result'][0].site_company_logo_business_card
          }
          if (res['result'][0].site_company_logo_business_card) {
            this.logo_business_card = res['result'][0].site_company_logo_site + "/" + res['result'][0].site_company_logo_business_card;
            this.logo_business_card_bin = true;
          }
          else {
            this.logo_business_card = this.serverService.get_default_image();
            this.logo_business_card_bin = false;
          }

          this.logo_national_card_info = {
            site: res['result'][0].site_company_site,
            path: res['result'][0].site_company_logo_national_card
          }
          if (res['result'][0].site_company_logo_national_card) {
            this.logo_national_card = res['result'][0].site_company_logo_site + "/" + res['result'][0].site_company_logo_national_card;
            this.logo_national_card_bin = true;
          }
          else {
            this.logo_national_card = this.serverService.get_default_image();
            this.logo_national_card_bin = false;
          }

          this.logo_ceo_info = {
            site: res['result'][0].site_company_site,
            path: res['result'][0].site_company_logo_ceo
          }
          if (res['result'][0].site_company_logo_ceo) {
            this.logo_ceo = res['result'][0].site_company_logo_site + "/" + res['result'][0].site_company_logo_ceo;
            this.logo_ceo_bin = true;
          }
          else {
            this.logo_ceo = this.serverService.get_default_image();
            this.logo_ceo_bin = false;
          }

          this.logo_official_newspaper_info = {
            site: res['result'][0].site_company_site,
            path: res['result'][0].site_company_logo_official_newspaper
          }
          if (res['result'][0].site_company_logo_official_newspaper) {
            this.logo_official_newspaper = res['result'][0].site_company_logo_site + "/" + res['result'][0].site_company_logo_official_newspaper;
            this.logo_official_newspaper_bin = true;
          }
          else {
            this.logo_official_newspaper = this.serverService.get_default_image();
            this.logo_official_newspaper_bin = false;
          }

          this.logo_membership_info = {
            site: res['result'][0].site_company_site,
            path: res['result'][0].site_company_logo_membership
          }
          if (res['result'][0].site_company_logo_membership) {
            this.logo_membership = res['result'][0].site_company_logo_site + "/" + res['result'][0].site_company_logo_membership;
            this.logo_membership_bin = true;
          }
          else {
            this.logo_membership = this.serverService.get_default_image();
            this.logo_membership_bin = false;
          }

          this.result = res['result'][0];
          this.get_state();
        }//end iff
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
          if (this.type_task == 2) {
            this.update_form1.patchValue({
              'state': this.result.site_city_state
            })
          }
          this.get_city();
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_city() {
    var obj = {
      address: 6922
      , state: this.update_form1.value.state
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_city = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_city.push(res['result'][i]);
          }
          if (this.type_task == 2) {
            this.update_form1.patchValue({
              'city': this.result.site_company_city,
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
      , cellphone: this.update_form1.value.cellphone
      , cellphone2: this.update_form1.value.cellphone2
      , phone: this.update_form1.value.phone
      , adress: this.update_form1.value.adress
      , code_posti: this.update_form1.value.code_posti
      , email: this.update_form1.value.email
      , state: this.update_form1.value.state
      , city: this.update_form1.value.city
      , type: this.update_form1.value.type
      , site: this.serverService.get_site()
      , business_card_info: this.logo_business_card_info
      , official_newspaper_info: this.logo_official_newspaper_info
      , membership_info: this.logo_membership_info
      , national_card_info: this.logo_national_card_info
      , ceo_info: this.logo_ceo_info
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
      , cellphone: this.update_form1.value.cellphone
      , cellphone2: this.update_form1.value.cellphone2
      , phone: this.update_form1.value.phone
      , adress: this.update_form1.value.adress
      , code_posti: this.update_form1.value.code_posti
      , email: this.update_form1.value.email
      , state: this.update_form1.value.state
      , city: this.update_form1.value.city
      , type: this.update_form1.value.type
      , site: this.serverService.get_site()
      , business_card_info: this.logo_business_card_info
      , official_newspaper_info: this.logo_official_newspaper_info
      , membership_info: this.logo_membership_info
      , national_card_info: this.logo_national_card_info
      , ceo_info: this.logo_ceo_info
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

  change_type() {
    this.update_form1.patchValue({
      'rnumber': null,
      'date_registeration': null,
      'national_id': null
    })
  }


  close() {
    this.matDialogRef.close();
  }
  //************************************************************* */
  change_logo_business_card(event: any) {
    var selectedFile = <File>event.target.files[0];
    var fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    this.serverService.post_address_file(this.server, "uploadImage", fd).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          ///this.uploadedAvaterProgess = (event.loaded / event.total) * 100;
        }
        else if (event.type === HttpEventType.Response) {
          var a = <any>event.body;
          this.logo_business_card = this.serverService.get_site_upload_image() + "/" + this.serverService.get_path_upload_image() + a.result.filename;
          this.logo_business_card_bin = true;
          this.logo_business_card_info = {
            'site': this.serverService.get_site_upload_image(),
            'path': this.serverService.get_path_upload_image() + a.result.filename
          }
        }
      }
    )
  }

  delete_logo_business_card() {
    this.logo_business_card = this.serverService.get_default_image();
    this.logo_business_card_bin = false;
    this.logo_business_card_info = {
      path: '',
      site: ''
    }
  }
  //************************************************ */
  change_logo_national_card(event: any) {
    var selectedFile = <File>event.target.files[0];
    var fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    this.serverService.post_address_file(this.server, "uploadImage", fd).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          ///this.uploadedAvaterProgess = (event.loaded / event.total) * 100;
        }
        else if (event.type === HttpEventType.Response) {
          var a = <any>event.body;
          this.logo_national_card = this.serverService.get_site_upload_image() + "/" + this.serverService.get_path_upload_image() + a.result.filename;
          this.logo_national_card_bin = true;
          this.logo_national_card_info = {
            'site': this.serverService.get_site_upload_image(),
            'path': this.serverService.get_path_upload_image() + a.result.filename
          }
        }
      }
    )
  }

  delete_logo_national_card() {
    this.logo_national_card = this.serverService.get_default_image();
    this.logo_national_card_bin = false;
    this.logo_national_card_info = {
      path: '',
      site: ''
    }
  }
  //*************************************************** */
  change_logo_ceo(event: any) {
    var selectedFile = <File>event.target.files[0];
    var fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    this.serverService.post_address_file(this.server, "uploadImage", fd).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          ///this.uploadedAvaterProgess = (event.loaded / event.total) * 100;
        }
        else if (event.type === HttpEventType.Response) {
          var a = <any>event.body;
          this.logo_ceo = this.serverService.get_site_upload_image() + "/" + this.serverService.get_path_upload_image() + a.result.filename;
          this.logo_ceo_bin = true;
          this.logo_ceo_info = {
            'site': this.serverService.get_site_upload_image(),
            'path': this.serverService.get_path_upload_image() + a.result.filename
          }
        }
      }
    )
  }

  delete_logo_ceo() {
    this.logo_ceo = this.serverService.get_default_image();
    this.logo_ceo_bin = false;
    this.logo_ceo_info = {
      path: '',
      site: ''
    }
  }
  //**************************************************
  change_logo_official_newspaper(event: any) {
    var selectedFile = <File>event.target.files[0];
    var fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    this.serverService.post_address_file(this.server, "uploadImage", fd).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          ///this.uploadedAvaterProgess = (event.loaded / event.total) * 100;
        }
        else if (event.type === HttpEventType.Response) {
          var a = <any>event.body;
          this.logo_official_newspaper = this.serverService.get_site_upload_image() + "/" + this.serverService.get_path_upload_image() + a.result.filename;
          this.logo_official_newspaper_bin = true;
          this.logo_official_newspaper_info = {
            'site': this.serverService.get_site_upload_image(),
            'path': this.serverService.get_path_upload_image() + a.result.filename
          }
        }
      }
    )
  }

  delete_logo_official_newspaper() {
    this.logo_official_newspaper = this.serverService.get_default_image();
    this.logo_official_newspaper_bin = false;
    this.logo_official_newspaper_info = {
      path: '',
      site: ''
    }
  }
  //**************************************************
  change_logo_membership(event: any) {
    var selectedFile = <File>event.target.files[0];
    var fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    this.serverService.post_address_file(this.server, "uploadImage", fd).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          ///this.uploadedAvaterProgess = (event.loaded / event.total) * 100;
        }
        else if (event.type === HttpEventType.Response) {
          var a = <any>event.body;
          this.logo_membership = this.serverService.get_site_upload_image() + "/" + this.serverService.get_path_upload_image() + a.result.filename;
          this.logo_membership_bin = true;
          this.logo_membership_info = {
            'site': this.serverService.get_site_upload_image(),
            'path': this.serverService.get_path_upload_image() + a.result.filename
          }
        }
      }
    )
  }

  delete_logo_membership() {
    this.logo_membership = this.serverService.get_default_image();
    this.logo_membership_bin = false;
    this.logo_membership_info = {
      path: '',
      site: ''
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