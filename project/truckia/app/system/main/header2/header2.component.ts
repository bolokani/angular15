import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from '../../services/server/server.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component implements OnInit {
  public user_info: any | undefined = JSON.parse(<any>localStorage.getItem('user_info'));
  public server: string = this.serverService.get_server();
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public status = JSON.parse(<any>localStorage.getItem('status'));
  public loading = false;
  public subscription: Subscription;
  public username: any;
  public user_id: number = 0;
  public user_token: number = 0;
  public show_bascket: boolean = false;
  public logo: string;
  public user_cellphone: string;

  constructor(
    public router: Router
    , public serverService: ServerService
    , public activatedRoute: ActivatedRoute
    , public dialog: MatDialog
    , public messageService: MessageService
    , public matSnackBar: MatSnackBar) {
    this.serverService.get_status().subscribe(
      (res) => {
        this.status = res;
      }
    )
  }

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
    }
    this.logo = "../../../../assets/img/logo4.png";
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
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.user_cellphone = res['result'][0].user_cellphone;
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }


  menu() {
    $(document).ready(function () {
      if (<any>$(window).scrollTop() > 0) {
        $(".site-header").addClass("site-header--scrolled");
      }
      if ($(window).scrollTop() == 0) {
        $(".site-header").removeClass("site-header--scrolled");
      }
      $(document).scroll(function () {
        console.log($(window).scrollTop());
        if (<any>$(window).scrollTop() > 0) {
          $(".site-header").addClass("site-header--scrolled");
        }
        if ($(window).scrollTop() == 0) {
          $(".site-header").removeClass("site-header--scrolled");
        }
      })//end scroll
    })
  }

  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) this.loading = false;
    if (validation == true) {
      this.matSnackBar.open(message, action, { duration: 3000 });
    }//end if
    else {
      //this.matSnackBar.dismiss();
    }
  }//end 

  oclose() {
    $(document).ready(function () {
      $(".mobile").removeClass('show');
    })
  }//end oclose

}



