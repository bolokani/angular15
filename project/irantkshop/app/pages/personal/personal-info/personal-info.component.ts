import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MessageService } from '../../services/message/message.service';
import { PersonalInfoDetaileComponent } from '../personal-info-detaile/personal-info-detaile.component';
import { PersonalAddressComponent } from '../personal-address/personal-address.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public user_title: String;
  public user_code_meli: String;
  public user_cellphone: String;
  public user_email: String;
  public list_address: any = [];

  constructor(
    public serverService: ServerService
    , public router: Router
    , public dialog: MatDialog
    , public messageService: MessageService
    , public matSnackBar: MatSnackBar) { }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
    }
    this.get_user();
    this.get_address();
  }

  get_user() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 2069, user_id: this.user_id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.user_title = res['result'][0].user_title;
            this.user_code_meli = res['result'][0].user_code_meli;
            this.user_cellphone = res['result'][0].user_cellphone;
            this.user_email = res['result'][0].user_email;
          } else {
            this.router.navigate(['/login']);
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
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

  open() {
    const dialogRef = this.dialog.open(PersonalInfoDetaileComponent, {
      width: '30rem',
      height: 'auto',
      hasBackdrop: true,
      data: { user_id: this.user_id }
    });
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.user_title = res.user_title;
          this.user_code_meli = res.user_code_meli;
          this.user_email = res.user_email;
        }
      }
    )
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


  delete_address(i: number, id: any) {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    var confirm_delete;
    confirm_delete = window.confirm(this.messageService.message_delete_accept(this.lang));
    this.loading = false;
    if (confirm_delete == true) {
      this.loading = true;
      var obj = {
        'address': 2074, "user_id": this.user_id, 'id': id
      }
      this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
        (res: any) => {
          if (res['status'] == 1) {
            this.list_address.splice(i, 1);
          }//end if
          else {
            this.message(true, this.messageService.message_delete_erorr(this.lang), 1, this.messageService.close(this.lang));
          }//end else
        }//
      )//
    }//end this.confirm_delete == true      
  }//end delete 
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