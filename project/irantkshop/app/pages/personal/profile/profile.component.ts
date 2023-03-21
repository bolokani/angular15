import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription | any;
  public logo: string | undefined;
  public cellphone: number | undefined;
  public title: number | undefined;
  public logo_info: any | undefined;


  constructor(
    public serverService: ServerService
    , public router: Router
    , public messageService: MessageService
    , public matSnackBar: MatSnackBar) {
  }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
  }

  go() {
    this.router.navigate(['/profile/orders'], { queryParams: { activeTab: 1 } })
  }

  get_user() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2027, user_id: this.user_id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            if (res['result'][0].user_logo3) {
              this.logo = res['result'][0].user_logo_site + "/" + res['result'][0].user_logo3;
            } else {
              this.logo = this.serverService.get_default_user_logo();
            }
          }
          this.title = res['result'][0].user_title;
          this.cellphone = res['result'][0].user_cellphone;
          this.message(false, "", 1, this.messageService.close(this.lang));
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
