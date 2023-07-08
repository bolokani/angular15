import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from '../../services/server/server.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public server: string = this.serverService.get_server();
  public status: any = JSON.parse(<any>localStorage.getItem('status'));
  public user_info: any | undefined = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public loading = false;
  public subscription: Subscription;
  public username: any;
  public user_id: number = 0;
  public show_bascket: boolean = false;
  public logo: string;
  public user_cellphone: string;
  public user_token: number = 0;
  public user_logo: string;

  constructor(
    public router: Router
    , public serverService: ServerService
    , public messageService: MessageService
    , public dialog: MatDialog
    , public matSnackBar: MatSnackBar) {
    this.serverService.get_status().subscribe(
      (res) => {
        this.status = res;
      }
    )

  }

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
      this.get_user();
    }
    //this.get_logo();
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
        if (res['status'] == 1 && res['num'] == 1) {

          if (res['result'][0].user_logo) {
            this.user_logo = res['result'][0].user_logo_site + "/" + res['result'][0].user_logo;
          } else {
            this.user_logo = this.serverService.get_default_user_logo();
          }
          this.user_cellphone = res['result'][0].user_cellphone;
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  go_to_content(id: number, title: string) {
    var title_array = title.split(" ");
    var title1: any = '';
    for (var i = 0; i < title_array.length; i++) {
      title1 += title_array[i];
      title1 += "-";
    }
    this.router.navigate(['/content-detaile', id, title1])
  }


  get_logo() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2148, id: 46 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.logo = res['result'][0].site_baner_site_logo + "/" + res['result'][0].site_baner_logo;
          }
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }


  go_to_course(id: number, title: string) {
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/detaile', id, title1])
  }

  go_to_about(title: string) {
    var title_array = title.split(" ");
    var title1: any = '';

    for (var i = 0; i < title_array.length; i++) {
      title1 += title_array[i];
      title1 += "-";
    }
    this.router.navigate(['/about-us', title1])
  }

  go_to_gallery(id: number, title: string) {
    var title_array = title.split(" ");
    var title1: any = '';
    for (var i = 0; i < title_array.length; i++) {
      title1 += title_array[i];
      title1 += "-";
    }
    this.router.navigate(['/gallery', id, title1])
  }


  go_to_photo_gallery(title: string) {
    var title_array = title.split(" ");
    var title1: any = '';
    for (var i = 0; i < title_array.length; i++) {
      title1 += title_array[i];
      title1 += "-";
    }
    this.router.navigate(['/photo-gallery', title1])
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
      this.matSnackBar.open(message, action, { duration: 8000 });
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



