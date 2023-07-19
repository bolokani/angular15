import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { HttpEventType } from '@angular/common/http';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading: boolean = false;
  public user_id: number | undefined;
  public subscription: Subscription | any;
  public logo: string | undefined;
  public cellphone: number | undefined;
  public title: number | undefined;
  public logo_info: any | undefined;
  public user_logo: string;
  public user_title: string;
  public user_token: string;
  public count_company: number = 0;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public activatedRoute: ActivatedRoute
    , public messageService: MessageService
    , public matSnackBar: MatSnackBar) {

    this.serverService.get_loading().subscribe(
      (res: any) => {
        this.loading = res;
      }
    )

    this.serverService.get_user().subscribe(
      (res) => {
        //this.get_user();
      }
    )

    this.serverService.get_count_company().subscribe(
      (res) => {
        this.get_count_company();
      }
    )

  }//end consructor

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        if (params['userId']) {
          this.user_id = params['userId'];
          this.user_token = params['token'];
          var obj = {
            user_id: params['userId'],
            user_token: params['token'],
          };
          localStorage.setItem("lang", JSON.stringify(1));
          localStorage.setItem('user_info', JSON.stringify(obj));
        }
      }
    )
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
      this.get_user();
    } else {
      this.serverService.signout();
    }
  }

  go() {
    this.router.navigate(['/profile/orders'], { queryParams: { activeTab: 1 } })
  }

  get_user() {
    this.loading = true;
    var obj = {
      address: 6871
      , user_id: this.user_id
      , user_token: this.user_token
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          if (res['result'][0].user_logo) {
            this.user_logo = res['result'][0].user_logo_site + "/" + res['result'][0].user_logo;
          } else {
            this.user_logo = this.serverService.get_default_user_logo();
          }
          this.get_count_company();
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.serverService.signout();
        }
      }
    )
  }

  get_count_company() {
    var obj = {
      address: 6928
      , user_id: this.user_id
      , user_token: this.user_token
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.count_company = res['result'][0].count;
          } else {
            this.count_company = 0;
          }
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  change_avater3(event: any) {
    var selectedFile = <File>event.target.files[0];
    var fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    this.serverService.post_address_file(this.server, "uploadImage3", fd).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          //this.uploadedAvaterProgess3 = (event.loaded / event.total) * 100;
        }
        else if (event.type === HttpEventType.Response) {
          var a = <any>event.body;
          this.logo = this.serverService.get_site() + "/" + this.serverService.get_path_upload_image() + a.result.filename;
          this.logo_info = {
            'site': this.serverService.get_site(),
            'path': this.serverService.get_path_upload_image() + a.result.filename
          }
          this.save_logo();
        }
      }
    )
  }

  save_logo() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2046, user_id: this.user_id, logo_info: this.logo_info }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_save(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }
  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) { this.loading = false; }
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
