import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserModule, DomSanitizer, Meta } from '@angular/platform-browser';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public server: any = this.serverService.get_server();
  public server2: any = this.serverService.get_server2();
  public lang: any = 1;
  public user_id: number | undefined;
  public subscription: Subscription | any;
  public loading = false;
  public list_other_goods: any = [];
  public list_new_goods: any = [];
  public list_special_goods: any = [];
  public list_microwave: any = [];
  public list_content3: any = [];
  public list_special_content: any = [];
  public q: string;



  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public dialog: MatDialog
    , public messageService: MessageService
    , public sanitizer: DomSanitizer,) { }//end consructor

  ngOnInit() {
    this.get_special_content();
    this.get_special_goods();

    this.serverService.set_metas('فروشگاه بک لایت تلویزیون و قطعات ماکروفر', 'فروشگاه بک لایت تلویزیون و قطعات ماکروفر', '');
  }

  search() {
    this.router.navigate(['/category/0/همه-کالاها'], { queryParams: { q: this.q } })
  }

  get_special_content() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2152 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].site_content_logo) {
              res['result'][i].logo = res['result'][i].site_content_site_logo + "/" + res['result'][i].site_content_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_image();
            }
            this.list_special_content.push(res['result'][i])
          }
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_special_goods() {
    var obj = { address: 2023 }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_special_goods = [];
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo()
            }
            this.list_special_goods.push(res['result'][i]);
          }
          this.get_new_goods(124, 555);
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_new_goods(cate: number, id: number) {
    var obj = { address: 2025, cate: cate }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_new_goods = [];
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo()
            }
            this.list_new_goods.push(res['result'][i]);
          }
          this.get_other_goods(124, 555);
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_other_goods(cate: number, id: number) {
    var obj = { address: 2021, cate: cate }
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
          this.get_microwave_goods(118);
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_microwave_goods(cate: number) {
    var obj = { address: 2022, cate: cate }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_microwave = [];
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo()
            }
            this.list_microwave.push(res['result'][i]);
          }

          $(document).ready(function () {
            ($(".owl-carousel") as any).owlCarousel({
              rtl: true,
              loop: true,
              margin: 10,
              autoplay: true,
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

  open(id: number, title: string) {
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/product-' + id, title1]);
    this.subscription.unsubscribe();
  }

  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) { this.loading = false; }
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