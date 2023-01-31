import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '../../pages/services/message/message.service';
import { DOCUMENT } from '@angular/common';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog'
import { AllGoodsDetaileImagesComponent } from '../all-goods-detaile-images/all-goods-detaile-images.component';
declare var $: any

@Component({
  selector: 'app-all-goods-detaile',
  templateUrl: './all-goods-detaile.component.html',
  styleUrls: ['./all-goods-detaile.component.scss']
})
export class AllGoodsDetaileComponent implements OnInit, OnDestroy {
  public server: string = this.serverService.get_server();
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public comment: any;
  public title: any;
  public title2: any;
  public id: number;
  public logo: string;
  public list_album: any = [];
  public list_property: any = [];
  public list_color: any = [];
  public group_title: string;
  public price2: number;
  public discount: number = 0;
  public sum: number = 0;

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
      (params: Params) => {
        if (params['id']) {
          this.id = params['id'];
          this.get_data();

        } else {
          this.router.navigate(['/not-found'])
        }
      }
    );
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }


    //************************************************ */

  }

  loadNextScript() {
    const s = this.renderer2.createElement('script')
    s.src = '../../../assets/js/product.js'
    s.text = ``
    this.renderer2.appendChild(this.document.body, s)
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
          this.price2 = res['result'][0].wharehouse_material_price2;
          this.discount = res['result'][0].wharehouse_material_discount;
          this.sum = (1 * res['result'][0].wharehouse_material_price2) - (res['result'][0].wharehouse_material_price2 * res['result'][0].wharehouse_material_discount / 100);
          if (res['result'][0].wharehouse_material_logo) {
            this.logo = res['result'][0].wharehouse_material_site_logo + "/" + res['result'][0].wharehouse_material_logo + "?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90";
          }
          const s = this.renderer2.createElement('script')
          s.onload = this.loadNextScript.bind(this)
          s.type = 'text/javascript'
          s.src = '../../../assets/js/template.js'
          s.text = ``
          this.renderer2.appendChild(this.document.body, s);
          this.get_attachment();
          this.get_property();
          //this.get_color();
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.router.navigate(['/not-found']);
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }


  add_to_bascket() {
    if (!this.user_id) {
      this.router.navigate(['/login']);
    }
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    var obj = {
      address: 1995
      , user_id: this.user_id
      , material_id: this.id
      , number: 1
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          var pe_message = "در سبد خرید قرار گرفت";
          this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
          this.serverService.send_count_order();
        }//end if
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

  get_color() {
    var obj = { address: 1986, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_color.push(res['result'][i]);
          }
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
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
            res['result'][i].logo = res['result'][i].site_attach_site + "/" + res['result'][i].site_attach_name;
            this.list_album.push(res['result'][i]);
          }
        }//end if
        else {
          this.router.navigate(['/not-found']);
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
      this.matSnackBar.open(message, action, { duration: 8000 });
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
