import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../../pages/services/message/message.service';

@Component({
  selector: 'app-all-goods-list',
  templateUrl: './all-goods-list.component.html',
  styleUrls: ['./all-goods-list.component.scss']
})
export class AllGoodsListComponent implements OnInit, OnDestroy {
  public server: any = this.serverService.get_server();
  public loading = false;
  public loading_cate: boolean = false;
  public subscription: Subscription | undefined;
  public lang = 1;
  public list_goods: any = [];
  public list_baner3: any = [];
  public header_baner1: string | undefined;
  public header_baner2: string | undefined;
  public movie1: string | undefined;
  public id: number | undefined;
  public group: number = 0;
  public title: string | undefined;
  public list_group: any = [];
  public list_cate: any = [];
  public page: number = 1;
  @ViewChild("videoRef", { static: true }) videoRef: ElementRef<HTMLVideoElement> | any;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public dialog: MatDialog
    , private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.group = params['group'];
        if (this.group) this.start('first');
      }
    );

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.group) this.start('first');
      }
    )


  }//end consructor

  ngOnInit() {
    this.title = 'همه کالاها';
    this.get_group();
  }

  start(step_load: string) {
    if (this.group == 1) {
      this.get_goods_with_group(step_load);
    } else {
      this.get_goods_with_cate(step_load);
    }
  }

  get_goods_with_cate(step_load: string) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    if (step_load == 'first') this.page = 1;
    else this.page++;

    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2019, cate: this.id, page: this.page }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (step_load == 'first') this.list_goods = [];
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo();
            }
            this.list_goods.push(res['result'][i]);
          }//end for
          this.title = res['title'];
          this.serverService.set_metas(res['title'], res['title'], '');
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_goods_with_group(step_load: string) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1954, group: this.id }).subscribe(
      (res: any) => {
        this.list_goods = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {

            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo();
            }
            this.list_goods.push(res['result'][i]);
          }//end for
          this.title = res['title'];
          this.serverService.set_metas(this.title, this.title, '');
          this.message(false, "", 1, this.messageService.close(this.lang));
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
  }

  get_group() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = { address: 1952 }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_group = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_group.push(res['result'][i]);
          }//end for
          //this.get_cate();
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_group

  get_cate(id: number) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading_cate = true;
    var obj = { address: 2018, id: id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_cate = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_cate.push(res['result'][i]);
          }//end for
          this.loading_cate = false;
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  open_cate(id: number, title: string) {
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/category', id, title1])
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