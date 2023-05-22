import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public show_bascket: boolean = false;
  public logo: string;

  constructor(
    public router: Router
    , public serverService: ServerService
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
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    //this.get_logo();
    this.logo = "https://truckbama.com/assets/img/logo2.png";
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

  go_to_short_movie(title: string) {
    var title_array = title.split(" ");
    var title1: any = '';

    for (var i = 0; i < title_array.length; i++) {
      title1 += title_array[i];
      title1 += "-";
    }
    this.router.navigate(['/all-courses', title1])
  }

  go_to_short_movie1(id: number, title: string) {
    var title_array = title.split(" ");
    var title1: any = '';

    for (var i = 0; i < title_array.length; i++) {
      title1 += title_array[i];
      title1 += "-";
    }
    this.router.navigate(['/free', id, title1])
  }

  go_to_short_movie2(id: number, title: string) {
    var title_array = title.split(" ");
    var title1: any = '';

    for (var i = 0; i < title_array.length; i++) {
      title1 += title_array[i];
      title1 += "-";
    }
    this.router.navigate(['/download', id, title1])
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


