import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerService } from '../../services/server/server.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public server: string = this.serverService.get_server();
  public server2: string = this.serverService.get_server2();
  public status: any = JSON.parse(<any>localStorage.getItem('status'));
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public loading = false;
  public subscription: Subscription;
  public username: any;
  public user_id: number = 0;
  public user_cellphone: string;
  public user_token: number = 0;
  public show_bascket: boolean = false;
  public list_bascket: any = [];
  public sum_all: number = 0;
  public count_course: number = 0;
  public baner_main: any | undefined;
  public baner_main_link: any | undefined;
  public baner_main_title: any | undefined;
  public baner_main_status: boolean = false;
  public logo: string;
  public list_group: any = [];
  public list_cate: any = [];
  public obj: any;
  public count: number = 0;

  constructor(
    public router: Router
    , public serverService: ServerService
    , public dialog: MatDialog
    , public messageService: MessageService
    , public matSnackBar: MatSnackBar) {

    this.serverService.get_count_order().subscribe(
      (res) => {
        this.get_count_orders();
      }
    )

  }

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
      this.get_user();
    }
    this.logo = "../../assets/img/logo.png";
    this.baner_main = this.serverService.get_site() + "/object/images/1.gif";
    this.baner_main_status = true;
    this.get_count_orders();
  }

  get_group() {
    this.serverService.send_mat_drawer();
  }

  go(group: number) {
    this.router.navigate(['/all-goods/همه-کالاها'], { queryParams: { group: group } })
  }

  get_count_orders() {
    this.loading = true;
    var obj = {
      address: 1996
      , user_id: this.user_id
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.count = res['count'];
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }


  get_user() {
    this.loading = true;
    var obj = {
      address: 1993
      , user_id: this.user_id
      , user_token: this.user_token
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.user_cellphone = res['result'][0].user_cellphone;
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_cate() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = { address: 1953 }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_cate = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_cate.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_show_bascket() {
    this.serverService.send_order();
    this.show_bascket = !this.show_bascket;

  }

  get_show_bascket2() {
    this.show_bascket = false;
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
  //************************************************************************************** */
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) { this.loading = false; }
    if (validation == true) {
      this.matSnackBar.open(message, action, { duration: 5000 });
    }//end if
    else {
      //this.matSnackBar.dismiss();
    }
  }//end 

  signout() {

  }

  oclose() {
    $(document).ready(function () {
      $(".mobile").removeClass('show');
    })
  }//end oclose

}



