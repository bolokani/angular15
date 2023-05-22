import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MessageService } from '../../services/message/message.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactDetaileComponent } from '../../contact-detaile/contact-detaile.component';
import { ContractCommentComponent } from '../../contract-comment/contract-comment.component';
import { ContractProcessComponent } from '../../contract-process/contract-process.component';
import { ContractInvoiceComponent } from '../../contract-invoice/contract-invoice.component';

@Component({
  selector: 'app-prsonal-contract',
  templateUrl: './prsonal-contract.component.html',
  styleUrls: ['./prsonal-contract.component.scss']
})
export class PrsonalContractComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public activeTab: number;
  public tab_id: number;
  public list_orders: any = [];
  public date: String;
  public tracking_code: String;
  public amount: number;
  public discount: number;
  public list_invoice: any = [];
  public list_tab: any = [];
  public list_contract: any = [];
  public contract_id: number;


  constructor(
    public serverService: ServerService
    , public router: Router
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute
    , public dialog: MatDialog
    , public matSnackBar: MatSnackBar) { }//end consructor

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id
    }
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.get_contract();
      }
    )
  }

  get_contract() {
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6543, user_id: this.user_id }).subscribe(
      (res: any) => {
        this.list_contract = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].logo) {
              res['result'][i].logo = this.serverService.get_site() + "/" + res['result'][i].logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_image();
            }
            this.list_contract.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  open(id: number, contract_number: string) {
    this.contract_id = id;
    this.dialog.open(ContactDetaileComponent, {
      width: '25rem',
      height: 'auto',
      data: { id: id, contract_number: contract_number }
    })
  }

  open_comment(id: number, contract_number: string) {
    var width = '23rem';
    if (window.innerWidth > 576) {
      width = '50rem';
    }
    this.dialog.open(ContractCommentComponent, {
      width: width,
      height: 'auto',
      data: { id: id, contract_number: contract_number }
    })
  }

  open_process(id: number, contract_number: string) {
    var width = '22rem';
    if (window.innerWidth > 576) {
      width = '22rem';
    }
    this.dialog.open(ContractProcessComponent, {
      width: width,
      height: 'auto',
      data: { id: id, contract_number: contract_number }
    })
  }

  open_invoice(id: number, contract_number: string) {
    var width = '22rem';
    if (window.innerWidth > 576) {
      width = '22rem';
    }
    this.dialog.open(ContractInvoiceComponent, {
      width: width,
      height: 'auto',
      data: { id: id, contract_number: contract_number }
    })
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