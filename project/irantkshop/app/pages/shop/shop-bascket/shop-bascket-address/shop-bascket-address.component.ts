import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from '../../../services/server/server.service';
import { MessageService } from '../../../services/message/message.service';
//import { PersonalChangeProfileComponent } from '../../../personal/personal-change-profile/personal-change-profile.component';



@Component({
  selector: 'app-shop-bascket-address',
  templateUrl: './shop-bascket-address.component.html',
  styleUrls: ['./shop-bascket-address.component.css']
})
export class ShopBascketAddressComponent implements OnInit, OnDestroy {
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info = JSON.parse(<any>localStorage.getItem('user_info'));
  public server: any = this.serverService.get_server();
  public status: any = JSON.parse(<any>localStorage.getItem('status'));
  public loading = false;
  public subscription: Subscription;
  public username: any;
  public list_bascket: any = [];
  public sum: number = 0;
  public cellphone: any;
  public user_id: any;
  public list_stime: any = [];
  public user_title_stime: string;
  public user_cellPhone_stime: any;
  public user_address_stime: any;
  public user_code_posti_stime: any;
  public user_stime: number;
  public stime_id: number = 0;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public dialog: MatDialog
    , public messageService: MessageService) {
  }//end consructor

  ngOnInit() {
    //this.get_user();
    //this.get_product();
  }//end get_course

  get_user() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.subscription = this.serverService.post_address(this.server, 'new_address', { id: this.user_id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.user_title_stime = res['result'][0].user_title_stime;
          this.user_cellPhone_stime = res['result'][0].user_cellPhone_stime;
          this.user_address_stime = res['result'][0].user_address_stime;
          this.user_code_posti_stime = res['result'][0].user_code_posti_stime;
          this.user_stime = res['result'][0].user_stime;
          this.stime_id = res['result'][0].user_stime;
          this.get_stime();
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_course

  open_modal_change_profile() {
    /*
    const dialogRef = this.dialog.open(PersonalChangeProfileComponent,{
      width:'50rem',
      height:'25rem',
      data : { id : this.user_id , type : 2}
    });
 
    dialogRef.afterClosed().subscribe(
     (result)=>{
       if(result != null ){
        this.user_title_stime = result.user_title_stime;
        this.user_cellPhone_stime = result.user_cellPhone_stime;
        this.user_code_posti_stime = result.user_code_posti_stime;
        this.user_address_stime  = result.user_address_stime ;
       }//end result
     }
    )
    */
  }

  get_stime() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    //this.serverService.send_loading(true);
    this.subscription = this.serverService.get_address(this.server, 'product_get_stime').subscribe(
      (res: any) => {
        this.list_stime = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_stime.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_stime

  select_stime(id: number) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.stime_id = id;
    //this.serverService.send_loading(true);
    this.subscription = this.serverService.post_address(this.server, 'product_select_stime', { user_id: this.user_id, 'stime': id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end select_stime

  get_product() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    //this.serverService.send_loading(true);
    this.subscription = this.serverService.post_address(this.server, 'product_get_bascket', { username: this.username, user_id: this.user_id }).subscribe(
      (res: any) => {
        this.list_bascket = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_bascket.push(res['result'][i]);
            this.list_bascket[i].product_goods_price_without_discount = res['result'][i].product_goods_price * res['result'][i].product_bascket_number;
            this.sum = this.sum + Number(this.list_bascket[i].product_goods_price_without_discount);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }//end get_product



  continue(): any {
    this.router.navigate(['/shopping', 'tracking']);
    /*
    if (this.status == 1) {
      if (this.list_bascket.length == 0) {
        var pe_message = "سبد خرید شما خالی می باشد.لطفا از منوی محصولات ، محصول خود را انتخاب نمائید";
        this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        return false;
      }//end 


      if (!this.user_title_stime || !this.user_cellPhone_stime || !this.user_code_posti_stime || !this.user_address_stime) {
        var pe_message = "لطفا آدرس تحویل را کامل تکمیل نمائید";
        this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        return false;
      }//end 

      if (!this.stime_id) {
        var pe_message = "لطفا نحوه ارسال را انتخاب نمائید";
        this.message(true, this.messageService.message(this.lang, pe_message, ''), 1, this.messageService.close(this.lang));
        return false;
      }//end 

      this.router.navigate(['/shop-shopping', 'pay']);
    } else {
      this.router.navigate(['/login', 2]);
    }
    */
  }

  ngAfterViewInit() {
    this.serverService.send_stepper_index(1)
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



