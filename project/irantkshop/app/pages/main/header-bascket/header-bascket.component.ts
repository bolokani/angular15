import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerService } from '../../services/server/server.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-header-bascket',
  templateUrl: './header-bascket.component.html',
  styleUrls: ['./header-bascket.component.scss']
})
export class HeaderBascketComponent implements OnInit {
  public server: string = this.serverService.get_server();
  public server2: string = this.serverService.get_server2();
  public status: any = JSON.parse(<any>localStorage.getItem('status'));
  public user_info: any | undefined = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public loading = false;
  public subscription: Subscription;
  public sum: number = 0;
  public user_id: number = 0;
  public list_bascket: any = [];
  public sum_all: number = 0;

  constructor(
    public router: Router
    , public serverService: ServerService
    , public dialog: MatDialog
    , public messageService: MessageService
    , public matSnackBar: MatSnackBar) {

    this.serverService.get_order().subscribe(
      (res) => {
        this.get_bascket()
      }
    )

    this.serverService.get_bascket().subscribe(
      (res) => {
        if (this.user_info) {
          this.user_id = this.user_info.user_id;
        }
        this.get_order();
      }
    )
  }

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    this.get_bascket();
  }

  get_bascket() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 1987,
      user_id: this.user_id
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_bascket = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            res['result'][i].price_without_discount = res['result'][i].wharehouse_order_number * res['result'][i].wharehouse_material_price2;
            res['result'][i].price_with_discount = res['result'][i].price_without_discount - (res['result'][i].price_without_discount * res['result'][i].wharehouse_order_discount / 100);
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            }
            this.list_bascket.unshift(res['result'][i]);
          }//end for
          this.get_all_sum();
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_bascket

  change_number(i: number, id: number) {
    var x = <any>document.getElementById('number' + id);
    var value = x.value;
    var price_temp = this.list_bascket[i].product_goods_price_with_discount;
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = { address: 1988, order_id: id, value: value }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.list_bascket[i].wharehouse_order_number = value;
            this.list_bascket[i].price_without_discount = res['result'][0].wharehouse_order_number * res['result'][0].wharehouse_material_price2;
            this.list_bascket[i].price_with_discount = this.list_bascket[i].price_without_discount - (this.list_bascket[i].price_without_discount * res['result'][0].wharehouse_order_discount / 100);
            this.get_all_sum();
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//change_number

  get_all_sum() {
    this.sum = 0;
    for (var i = 0; i < this.list_bascket.length; i++) {
      this.sum = this.sum + this.list_bascket[i].price_with_discount;
    }
  }

  open(id: number, title: string) {
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/goods-detaile', id, title1])
  }

  delete(i: number, id: number) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1997, id: id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_bascket.splice(i, 1);
          this.serverService.send_count_order();
          this.get_all_sum();
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

  insert_visitor() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2161 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {

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



  pay() {
    var obj = {
      'sum': 100, user_id: this.user_id
    }
    this.subscription = this.serverService.post_address(this.server2, 'pay_course', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          window.location.href = res['address'];
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      })
  }

  get_order() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2040, user_id: this.user_id }).subscribe(
      (res: any) => {
        this.list_bascket = [];
        if (res['status'] == 1) {
          this.sum_all = 0;
          for (var i = 0; i < res['num']; i++) {
            res['result'][i].sum = res['result'][i].site_bascket2_number * res['result'][i].site_bascket2_price;
            this.sum_all += res['result'][i].sum;
            this.list_bascket.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
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

  go_to_about(title: string) {
    var title_array = title.split(" ");
    var title1: any = '';

    for (var i = 0; i < title_array.length; i++) {
      title1 += title_array[i];
      title1 += "-";
    }
    this.router.navigate(['/about-us', title1])
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



