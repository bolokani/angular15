import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../../services/server/server.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from '../../../services/message/message.service';
import { PersonalAddressComponent } from '../../../personal/personal-address/personal-address.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-shop-bascket-select-address',
  templateUrl: './shop-bascket-select-address.component.html',
  styleUrls: ['./shop-bascket-select-address.component.scss']
})
export class ShopBascketSelectAddressComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public id: number;
  public address: number;
  public type_task: number;
  public list_address: any = [];

  constructor(
    public serverService: ServerService
    , public router: Router
    , public messageService: MessageService
    , public dialog: MatDialog
    , public matDialogRef: MatDialogRef<ShopBascketSelectAddressComponent>
    , @Inject(MAT_DIALOG_DATA) public dialog_data: any
    , public matSnackBar: MatSnackBar) {
    if (dialog_data) {
      this.id = dialog_data.id;
      this.type_task = dialog_data.type_task;
      this.address = dialog_data.address_id;
    }
  }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    this.get_address();
  }


  get_address() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2073, user_id: this.user_id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_address.push(res['result'][i])
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  select_address() {
    for (var i = 0; i < this.list_address.length; i++) {
      if (this.list_address[i].user_address_id == this.address) {
        this.matDialogRef.close(this.list_address[i])
      }
    }
  }

  open_address(i: number, type_task: number, id: number) {
    const dialogRef = this.dialog.open(PersonalAddressComponent, {
      width: '30rem',
      height: 'auto',
      hasBackdrop: true,
      data: { user_id: this.user_id, type_task: type_task, id: id }
    });
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          if (type_task == 1) {
            this.list_address.unshift(res)
          } else {
            this.list_address[i].user_address_city = res.user_address_city;
            this.list_address[i].user_address_code_posti = res.user_address_code_posti;
            this.list_address[i].user_address_cellphone = res.user_address_cellphone;
            this.list_address[i].user_address_address = res.user_address_address;
            this.list_address[i].user_address_transferee = res.user_address_transferee;
          }
        }
      }
    )
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