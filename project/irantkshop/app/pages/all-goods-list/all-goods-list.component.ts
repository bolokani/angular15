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
  public subscription: Subscription;
  public lang = 1;
  public list_goods: any = [];
  public list_baner3: any = [];
  public header_baner1: string | undefined;
  public header_baner2: string | undefined;
  public movie1: string | undefined;
  public id: number | undefined;
  public title: string | undefined;
  public list_album: any = [];
  @ViewChild("videoRef", { static: true }) videoRef: ElementRef<HTMLVideoElement> | any;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public dialog: MatDialog
    , private activatedRoute: ActivatedRoute) { }//end consructor

  ngOnInit() {
    this.title = 'همه کالاها';
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.get_goods(params['group']);
        this.get_album();
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
    this.router.navigate(['/goods-detaile', id, title1])
  }


  get_album() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1957 }).subscribe(
      (res: any) => {
        this.list_album = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_album.push(res['result'][i]);
          }//end for
          this.serverService.set_metas(this.title, this.title, '');
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_goods(group: number) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1954, group: group }).subscribe(
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
          this.serverService.set_metas(this.title, this.title, '');
          this.message(false, "", 1, this.messageService.close(this.lang));
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
    this.router.navigate(['/detaile2', id, title1])
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