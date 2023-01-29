import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerService } from '../../services/server/server.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component implements OnInit {
  public isOnline: any;
  public loading = false;
  public subscription: Subscription;
  public err: string; public err_validation: boolean = false;
  public err_internet_text: string; public err_internet_validation: boolean;
  public server: string = this.serverService.get_server();
  public server2: string = this.serverService.get_server2();
  public username: any;
  status: any = 0;
  user_info: any | undefined = JSON.parse(<any>localStorage.getItem('user_info'));
  user_id: number = 0;
  show_bascket: boolean = false;
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  list_bascket: any = [];
  sum_all: number = 0;
  count_course: number = 0;




  constructor(public router: Router, public serverService: ServerService, public dialog: MatDialog, public matSnackBar: MatSnackBar) {
    this.serverService.get_status().subscribe(
      (res) => {
        this.status = res;
      }
    )

    this.serverService.get_bascket().subscribe(
      (res) => {
        //this.get_order();
      }
    )
  }

  ngOnInit() {
    localStorage.setItem('lang', JSON.stringify(1));
    this.status = JSON.parse(<any>localStorage.getItem('status'));
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    //this.get_order();
  }

  get_show_bascket() {
    this.show_bascket = !this.show_bascket;
  }

  get_show_bascket2() {
    this.show_bascket = false;
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


  delete(i: number, id: number) {
    if (this.serverService.check_internet() == false) {
      var pe_message = "خطا در اینترنت";
      var pe_action = "بستن";
      this.message(true, 'Erorr in Internet', pe_message, 1, 'close', pe_action);
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2041, id: id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_bascket.splice(i, 1);
          this.serverService.send_bascket();
          this.message(false, "", "", 1, "", "");
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }


  pay() {
    var obj = {
      'sum': 100, user_id: this.user_id
    }
    this.subscription = this.serverService.post_address(this.server, 'pay_course', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          window.location.href = res['address'];
          this.message(false, "", "", 1, "", "");
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      })
  }

  get_order() {
    if (this.serverService.check_internet() == false) {
      var pe_message = "خطا در اینترنت";
      var pe_action = "بستن";
      this.message(true, 'Erorr in Internet', pe_message, 1, 'close', pe_action);
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2040, user_id: this.user_id }).subscribe(
      (res: any) => {
        this.list_bascket = [];
        if (res['status'] == 1) {
          this.sum_all = 0;
          this.count_course = res['num'];
          for (var i = 0; i < res['num']; i++) {
            res['result'][i].sum = res['result'][i].site_bascket2_number * res['result'][i].site_bascket2_price;
            this.sum_all += res['result'][i].sum;
            this.list_bascket.push(res['result'][i]);
          }//end for
          this.message(false, "", "", 1, "", "");
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }


  open_login() {
    this.dialog.open(LoginComponent, {
      width: '40rem',
      height: 'auto',
      data: { ref: 'menu' }
    });
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

  message(validation: boolean, en_message: string, pe_message: string, type: number, en_action: string, pe_action: string) {
    this.err_internet_validation = false;
    if (type == 1) this.loading = false;
    if (validation == true) {
      if (this.lang == 1) this.matSnackBar.open(pe_message, pe_action, { duration: 2000 });
      if (this.lang == 2) this.matSnackBar.open(en_message, en_action, { duration: 2000 });
    }//end if
    else {
      //this.matSnackBar.dismiss();
    }
  }

  signout() {

  }

  oclose() {
    $(document).ready(function () {
      $(".mobile").removeClass('show');
    })
  }//end oclose

}



