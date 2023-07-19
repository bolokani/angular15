import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
    , public activatedRoute: ActivatedRoute
    , public dialog: MatDialog
    , public matSnackBar: MatSnackBar) {
    this.serverService.get_status().subscribe(
      (res) => {
        this.status = res;
      }
    )

  }

  ngOnInit() {
    this.logo = "../../../../assets/img/logo4.png";
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



