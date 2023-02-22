import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-contract-invoice-attachment',
  templateUrl: './contract-invoice-attachment.component.html',
  styleUrls: ['./contract-invoice-attachment.component.scss']
})
export class ContractInvoiceAttachmentComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public list_record: any = [];
  public id: number;
  public count_attachment: number;
  public user_id: number | undefined;
  public list_load_file: any = [];
  public list_attachment: any = [];
  public contract_number: number;
  public path: string;

  public subscription: Subscription;
  constructor(
    public serverService: ServerService
    , public messageService: MessageService
    , public router: Router
    , public matDialogRef: MatDialogRef<ContractInvoiceAttachmentComponent>
    , public matSnackBar: MatSnackBar
    , @Inject(MAT_DIALOG_DATA) public dialog_data: any) {

    if (dialog_data) {
      this.id = dialog_data.id;
      this.contract_number = dialog_data.contract_number;
      this.path = dialog_data.path;
    }
  }//end consructor

  ngOnInit() {
    this.get_attachment();
  }

  get_attachment() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6778, id: this.id, path: this.path }).subscribe(
      (res: any) => {
        this.list_attachment = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_attachment.push(res['result'][i]);
          }//end for
          this.count_attachment = this.list_attachment.length;
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
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
//*****************************************************************************

