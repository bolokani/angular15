import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../../pages/services/message/message.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-all-goods-list',
  templateUrl: './all-goods-list.component.html',
  styleUrls: ['./all-goods-list.component.scss']
})
export class AllGoodsListComponent implements OnInit, OnDestroy {
  public server: any = this.serverService.get_server();
  public loading = false;
  public loading_cate = false;
  public subscription: Subscription | undefined;
  public lang = 1;
  public list_goods: any = [];
  public list_baner3: any = [];
  public header_baner1: string | undefined;
  public header_baner2: string | undefined;
  public movie1: string | undefined;
  public id: any | undefined;
  public group_params: number = 0;
  public group_title: string = '';
  public group_id: number = 0;
  public cate_title: string | undefined;
  public cate_id: number = 0;
  public title: string | undefined;
  public list_group: any = [];
  public list_cate: any = [];
  public page: number = 1;
  public params: boolean = false;
  public q: string;

  @ViewChild("videoRef", { static: true }) videoRef: ElementRef<HTMLVideoElement> | any;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public dialog: MatDialog
    , public activatedRoute: ActivatedRoute
    , @Inject(DOCUMENT) public document: Document) {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )

    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.q = params['q'];
        if (params['group']) {
          this.group_params = params['group'];
          this.get_goods_with_group('first', this.group_params);
        }
        else {
          var cate_id = this.document.location.pathname.split("/")[2];
          this.get_goods_with_cate("first", cate_id)
        }
        var group_params: any;
        var group_key: any;
        group_params = this.document.location.href.split("?")[1];
        if (group_params) {
          if (group_params.split("=")[0] == 'group') {
            group_key = group_params.split("=")[0];
            group_params = group_params.split("=")[1];
          }
        }


        //this.group_params = group_params;
        //alert(this.group_params)
        this.get_group(group_params, group_key);

      }
    );



  }//end consructor

  ngOnInit() {

  }

  start(step_load: string): any {
    if (this.document.location.pathname.split("/")[1] != 'category') {
      return false;
    }
    if (this.group_params > 0) {
      this.get_goods_with_group(step_load, this.group_params);
    } else {
      this.get_goods_with_cate(step_load, this.cate_id)
    }
  }


  get_goods_with_cate(step_load: string, cate_id: any) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    if (step_load == 'first') this.page = 1;
    else this.page++;
    this.loading = true;
    var obj = { address: 2019, cate: cate_id, page: this.page, q: this.q }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (step_load == 'first') this.list_goods = [];
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo();
            }
            res['result'][i].wharehouse_material_title2 = res['result'][i].wharehouse_material_title.replace(this.q, `<mark>${this.q}</mark>`);
            this.list_goods.push(res['result'][i]);
          }//end for
          this.get_group_title();
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//get_goods_with_cate


  get_group_title() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = { address: 2026, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.group_id = res['result'][0].material_group_id;
            this.group_title = res['result'][0].material_group_title;
            this.cate_title = res['result'][0].wharehouse_material_cate_title;
            this.cate_id = res['result'][0].wharehouse_material_cate_id;
          }
          if (this.id > 0) this.serverService.set_metas(this.cate_title, this.cate_title, '');
          else this.serverService.set_metas('همه کالا', '', '');
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_group_title

  get_goods_with_group2(id: number, title: string) {
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/category', id, title1], { queryParams: { group: id } });
  }

  get_goods_with_group(step_load: string, group_id: number) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    if (step_load == 'first') this.page = 1;
    else this.page++;
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1954, group: group_id, page: this.page }).subscribe(
      (res: any) => {
        if (step_load == 'first') this.list_goods = [];
        if (res['status'] == 1) {
          this.cate_id = 0;
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].wharehouse_material_title2 = res['result'][i].wharehouse_material_title.replace(this.q, `<mark>${this.q}</mark>`);
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo();
            }
            this.list_goods.push(res['result'][i]);
          }//end for
          this.get_group_title2(group_id);
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_group_title2(group_id: number) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = { address: 2027, id: group_id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.group_id = res['result'][0].material_group_id;
            this.group_title = res['result'][0].material_group_title;
            this.cate_title = '';
            this.cate_id = 0;
          }
          this.serverService.set_metas(this.group_title, this.group_title, '');
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_group_title

  open(id: number, title: string) {
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/product-' + id, title1]);
  }


  get_group(group_params: number, group_key: string) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    if (group_key != 'group') {
      group_params = 0;
    }
    var obj = { address: 1952, group_params: group_params }
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
    //this.loading_cate = true;
    var obj = { address: 2018, id: id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        this.list_cate = [];
        if (res['status'] == 1) {
          this.cate_id = this.id;
          for (var i = 0; i < res['num']; i++) {
            this.list_cate.push(res['result'][i]);
          }//end for
          //this.loading_cate = false;
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  open_cate(cate_id: number, title: string) {
    this.get_goods_with_cate('first', cate_id);
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/category', cate_id, title1]);
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