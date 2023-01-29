import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerService } from '../../service/server/server.service';

@Component({
  selector: 'app-shop-cate',
  templateUrl: './shop-cate.component.html',
  styleUrls: ['./shop-cate.component.css']
})
export class ShopCateComponent implements OnInit, OnDestroy {
  public isOnline: any;
  public loading = false;
  public subscription: Subscription;
  public err: string; public err_validation: boolean = false;
  public err_internet_text: string; public err_internet_validation: boolean;
  public server: any;
  public list_cate1: any = [];
  public list_cate2: any = [];

  constructor(public serverService: ServerService, public router: Router) { }//end consructor

  ngOnInit() {
    this.server = localStorage.getItem("server");
    var title = "نما تاسیسات برق مکانیک خرید و فروش مصالح ساختمانی پوشش و عایق ها";
    var keywords = "نما تاسیسات برق مکانیک خرید و فروش مصالح ساختمانی پوشش و عایق ها";
    var description = "نما تاسیسات برق مکانیک خرید و فروش مصالح ساختمانی پوشش و عایق ها";
    this.serverService.set_metas(title, keywords, description);
    this.get_cate1();
  }


  get_cate1() {
    if (this.serverService.check_internet()['status'] == false) {
      this.err_internet_validation = true;
      this.err_internet_text = this.serverService.check_internet()['title'];
      return;
    }//end if
    else { this.err_internet_validation = false; }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'product_menu_get_cate1', { 'menu': 2 }).subscribe(
      (res) => {
        this.list_cate1 = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num_result_cate1']; i++) {
            this.list_cate1.push(res['result_cate1'][i]);
          }//end for

          for (var i = 0; i < res['num_result_cate2']; i++) {
            this.list_cate2.push(res['result_cate2'][i]);
            console.log(this.list_cate2[i].product_cate2_title);
          }//end for

          this.recieve_erorr(false, false, "", "", 1);
        }//end if
        else {
          this.recieve_erorr(true, true, 'Erorr in recieve', "خطا در دريافت", 1);
        }
      }
    )
  }//end get_cate1

  go_to_products(cate1, id, product_title) {
    var title = "";
    var title_arr = product_title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title += title_arr[i];
      title += "-";
    }
    this.router.navigate(['/shop-product', id, title]);
  }//go_to_products

  //**************************************************
  recieve_erorr(err_validation, loading, en_message, pe_message, type) {
    this.err_validation = err_validation;
    if (type == 1) this.loading = false;
    this.err = pe_message;
  }//end 
  //*******************************************************************************
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }//end if
  }//end OnDestroy
}

