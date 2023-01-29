import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '../../pages/services/message/message.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-all-goods-detaile-images',
  templateUrl: './all-goods-detaile-images.component.html',
  styleUrls: ['./all-goods-detaile-images.component.scss']
})
export class AllGoodsDetaileImagesComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public list_album: any = [];
  public id: number;
  public ii: number = 0;
  public logo: string;
  public subscription: Subscription;
  public title: string;

  constructor(
    public serverService: ServerService
    , @Inject(DOCUMENT) public document: Document
    , public renderer2: Renderer2
    , public elementRef: ElementRef
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public matDialogRef: MatDialogRef<AllGoodsDetaileImagesComponent>
    , @Inject(MAT_DIALOG_DATA) public dialog_data: any) {
    if (dialog_data) {
      this.id = dialog_data.id;
    }
  }//end consructor

  ngOnInit() {
    this.get_data();

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
          this.title = res['result'][0].wharehouse_material_title;
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
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.router.navigate(['/not-found']);
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  loadNextScript() {
    const s = this.renderer2.createElement('script')
    s.src = '../../../assets/js/product.js'
    s.text = ``
    this.renderer2.appendChild(this.document.body, s)
  }

  get_attachment() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    var obj = { address: 1961, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_album.push(
            { logo: this.logo }
          );
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

  get_image(i: number) {
    this.ii = i;
    this.logo = this.list_album[i].logo;
  }

  close() {
    this.matDialogRef.close();
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
      this.subscription.unsubscribe();
    }//end if
  }//end OnDestroy
}