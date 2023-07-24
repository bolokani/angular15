import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../../services/server/server.service';
import { MessageService } from '../../../services/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { MembershipDetaile2Component } from '../membership-detaile2/membership-detaile2.component';

@Component({
  selector: 'app-membership-detaile',
  templateUrl: './membership-detaile.component.html',
  styleUrls: ['./membership-detaile.component.scss']
})
export class MembershipDetaileComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public loading_update: boolean = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public token: number;
  public user_token: number;
  public list_record: any = [];

  public date3: string;
  public tracking_code: string;
  public amount: string;
  public comment: string;
  public id: number;
  public current: any;
  public list_gallery: any = [];
  public status_title: string;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public dialog: MatDialog
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute) {



  }//end consructor

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }

    )

    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
      this.get_user();
    }
    var title = "جزئیات حق عضویت";
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
            this.get_data();
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

  get_data() {
    var obj = { address: 6941, user_id: this.user_id, user_token: this.user_token, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.date3 = res['result'][0].site_membership_date3;
            this.tracking_code = res['result'][0].site_membership_tracking_code;
            this.amount = res['result'][0].site_membership_amount;
            this.comment = res['result'][0].site_membership_comment;
            this.status_title = res['result'][0].membership_status_title;
          } else {
            this.date3 = '-';
            this.tracking_code = '-';
            this.amount = '-';
            this.comment = '-';
            this.status_title = '-';
          }
          this.get_attachment();
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_attachment() {
    var obj = { address: 6942, user_id: this.user_id, user_token: this.user_token, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_gallery = [];
          for (var i = 0; i < res['num']; i++) {
            res['result'][i].logo = res['result'][i].site_attach_site + "/" + res['result'][i].site_attach_name;
            this.list_gallery.push(res['result'][i]);
          }
          console.log(this.list_gallery)
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  open() {
    const dialogRef = this.dialog.open(MembershipDetaile2Component, {
      width: '22rem',
      height: 'auto',
      hasBackdrop: true,
      data: { user_id: this.user_id, type_task: 2, id: this.id }
    });
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.get_data();
        }
      }
    )
  }
  //************************************************************************************************** 1 *************************************
  openModal(id: any) {
    if (window.innerWidth > 768) {
      var x = <any>document.getElementById('myModalone');
      x.style.display = "block";
    }

  }//end openModal

  plusSlides(mySlides: any, dot: any, n: any) {
    this.current = this.current + (n);
    var slides = document.getElementsByClassName(mySlides);
    var dots = document.getElementsByClassName("dot");
    if (this.current > slides.length) { this.current = 1; }
    if (this.current < 1) { this.current = slides.length; }
    this.showSlides(mySlides, dot, this.current);
  }//end plusSlides

  currentSlide(mySlides: any, dot: any, n: any) {
    this.current = n;
    this.showSlides(mySlides, dot, n);
  }//end currentSlide  

  showSlides(mySlides: any, dot: any, n: any) {
    var i;
    var slideIndex = n;
    var slides = document.getElementsByClassName(mySlides);
    var dots = document.getElementsByClassName(dot);
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length };
    for (i = 0; i < slides.length; i++) {
      (<HTMLElement>slides[i]).style.display = "none";
    }//end for
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }//end for
    (<HTMLElement>slides[slideIndex - 1]).style.display = "block";
    dots[slideIndex - 1].classList.add("active");
  }//end showSlides 

  close_modal(myModal: any) {
    var x = <any>document.getElementById(myModal);
    x.style.display = "none";
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

