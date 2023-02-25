import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '../../pages/services/message/message.service';
import { DOCUMENT } from '@angular/common';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog'
import { AllGoodsDetaileImagesComponent } from '../all-goods-detaile-images/all-goods-detaile-images.component';


@Component({
  selector: 'app-all-goods-detaile',
  templateUrl: './all-goods-detaile.component.html',
  styleUrls: ['./all-goods-detaile.component.scss']
})
export class AllGoodsDetaileComponent implements OnInit, OnDestroy {
  public server: string = this.serverService.get_server();
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public token: any = JSON.parse(<any>localStorage.getItem('token'));
  public token_order: any = JSON.parse(<any>localStorage.getItem('token_order'));
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription | any;
  public comment: any;
  public title: any;
  public title2: any;
  public id: number = 0;
  public logo: string | undefined;
  public list_attachment: any = [];
  public list_property: any = [];
  public list_color: any = [];
  public list_other_goods: any = [];
  public group_title: string | undefined;
  public cate_title: string | undefined;
  public price2: number = 0;
  public price3: number = 0;
  public discount: number = 0;
  public remain: number = 0;
  public coding: any = 0;
  public cate: any = 0;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public renderer2: Renderer2,
    public elementRef: ElementRef,
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute
    , public sanitizer: DomSanitizer
    , public dialog: MatDialog) { }//end consructor

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (res) => {
        var x: any = this.document.location.pathname;
        this.id = x.split('/')[1].split('-')[1];
        if (this.id > 0) {
          this.get_data();
        } else {
          this.router.navigate(['/not-found']);
        }
      }
    )
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
  }


  get_data() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = { address: 1960, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1 && res['num'] == 1) {
          this.comment = this.sanitizer.bypassSecurityTrustHtml(res['result'][0].wharehouse_material_comment);
          this.title = res['result'][0].wharehouse_material_title;
          this.title2 = res['result'][0].wharehouse_material_title2;
          this.group_title = res['result'][0].material_group_title;
          this.cate_title = res['result'][0].wharehouse_material_cate_title;
          this.price2 = res['result'][0].wharehouse_material_price2;
          this.price3 = res['result'][0].wharehouse_material_price3;
          this.discount = res['result'][0].wharehouse_material_discount;
          this.remain = res['result'][0].wharehouse_material_remain;
          this.coding = res['result'][0].wharehouse_material_coding;
          this.cate = res['result'][0].wharehouse_material_cate;

          this.serverService.set_metas(this.title, res['result'][0].wharehouse_material_keyboard, res['result'][0].wharehouse_material_title2);
          this.get_attachment();
          this.get_property();
          this.get_other_goods(res['result'][0].wharehouse_material_cate, res['result'][0].wharehouse_material_id);
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.router.navigate(['/not-found']);
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_other_goods(cate: number, id: number) {
    var obj = { address: 2020, cate: cate }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_other_goods = [];
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo()
            }
            this.list_other_goods.push(res['result'][i]);
          }

          $(document).ready(function () {
            ($(".owl-carousel") as any).owlCarousel({
              rtl: true,
              loop: true,
              margin: 10,
              autoplay: true,
              lazyLoad: true,
              nav: true,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 3
                },
                1000: {
                  items: 7
                }
              }
            })
          });
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  ngAfterViewInit() {

  }

  open(id: number, title: string) {
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    window.open('/product-' + id + "/" + title1, "_self");
    this.subscription.unsubscribe();
  }


  add_to_bascket(): any {
    if (this.remain == 0) {
      return false;
    }
    var user_id = this.user_id;
    if (!this.user_id) {
      user_id = this.token_order;
    }
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 1995
      , user_id: user_id
      , material_id: this.id
      , token_order: this.token_order
      , number: 1
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          var pe_message = "در سبد خرید قرار گرفت";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
          this.serverService.send_count_order();
        }//end if
        else if (res['status'] == 5) {
          var pe_message = "خطا در ذخیره.این کالا فعلا از لیست فروش سایت خارج شده است.";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
        else if (res['status'] == 4) {
          var pe_message = "این مورد هم اکنون در سبد خرید شما قرار دارد";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        }
        else {
          this.message(true, this.messageService.erorr_in_save(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }


  get_property() {
    var obj = { address: 1985, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_property = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].answer_title) {
              this.list_property.push(res['result'][i]);
            }

          }
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }


  get_attachment() {
    var obj = { address: 1961, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].site_attach_name) {
              res['result'][i].src = res['result'][i].site_attach_site + "/" + res['result'][i].site_attach_name;
              this.list_attachment.push(res['result'][i]);
            }
          }
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  open_images() {
    this.dialog.open(AllGoodsDetaileImagesComponent, {
      width: '100rem',
      height: 'auto',
      data: { id: this.id }
    })
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
      console.log(1);
      this.subscription.unsubscribe();
    }//end if
  }//end OnDestroy
}
