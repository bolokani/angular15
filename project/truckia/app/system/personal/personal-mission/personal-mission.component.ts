import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-personal-mission',
  templateUrl: './personal-mission.component.html',
  styleUrls: ['./personal-mission.component.scss']
})
export class PersonalMissionComponent implements OnInit {
  public server: any = this.serverService.get_server();
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription | any;
  public title: string | undefined;
  public text: any | undefined;
  public title2: string | undefined;
  public text2: any | undefined;
  public title3: string | undefined;
  public text3: any | undefined;
  public user_token: number | undefined;


  constructor(
    public serverService: ServerService
    , public router: Router
    , public messageService: MessageService
    , public matSnackBar: MatSnackBar
    , public sanitizer: DomSanitizer) { }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
      this.get_user();
    } else {
      this.serverService.signout();
    }
    var title = "مرام نامه اخلاقی انجمن";
    this.serverService.set_metas(title, title, '', 'mohammad zamani');
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
            this.get_content(56);
          } else {
            this.serverService.signout();
            this.message(false, "", 1, this.messageService.close(this.lang));
          }
        }//end if
        else {
        }
      }
    )
  }

  get_content(id: number) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6866, id: id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.title = res['result'][0].site_content_title;
            this.text = this.sanitizer.bypassSecurityTrustHtml(res['result'][0].site_content_comment);
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
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
