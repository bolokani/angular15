import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../../services/message/message.service';
import { ContractInvoiceAttachmentComponent } from '../../contract-invoice-attachment/contract-invoice-attachment.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-contract-invoice',
  templateUrl: './contract-invoice.component.html',
  styleUrls: ['./contract-invoice.component.scss']
})
export class ContractInvoiceComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public server: any = this.serverService.get_server();
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public loading = false;
  public subscription: Subscription | any;
  public id: number | undefined;
  public list_record: any = [];
  public creator: string | undefined;
  public contract_number: string;
  public tab: number = 1;
  public width: any;
  public sum1: number = 0;
  public sum1_letter: string;
  public mat_table_selectedRow: any;
  public mat_table_hoverRow: any;
  public sum2: number;
  public user_id: number;
  public user_token: number;
  public dataSource: any | undefined;
  public displayedColumns = ['row', 'title', 'price', 'status', 'comment', 'attachment'];
  public displayedColumns2 = ['row', 'document', 'date3', 'price', 'user1', 'bank1', 'user2', 'bank2', 'tracking_code', 'type', 'payment_type', 'comment', 'attachment'];
  public type: number = 1;


  constructor(
    public serverService: ServerService
    , public router: Router
    , public dialog: MatDialog
    , public activatedRoute: ActivatedRoute
    , public messageService: MessageService
    , public matSnackBar: MatSnackBar) {
  }//end consructor

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id']
      }
    )
    this.width = innerWidth + 'px';
  }

  change(tab: number) {
    this.tab = tab;
  }

  get_financial2() {
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6777, contract_id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_record = [];
          for (var i = 0; i < res['num']; i++) {
            this.list_record.push(res['result'][i]);
          }
          this.get_sum2();
          this.dataSource = new MatTableDataSource(this.list_record);
          this.message(false, "", 1, this.messageService.close(1));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(1), 1, this.messageService.close(1));
        }
      }
    )
  }

  get_sum2() {
    this.sum2 = 0;
    for (var i = 0; i < this.list_record.length; i++) {
      if (this.list_record[i].finance_financial2_document == 6) {
        this.sum2 = this.sum2 + this.list_record[i].finance_financial2_amount;
      }
      else if (this.list_record[i].finance_financial2_document == 7) {
        this.sum2 = this.sum2 - this.list_record[i].finance_financial2_amount;
      }
    }
  }

  get_sum() {
  }

  get_attachment(id: number, path: string) {
    var width = '23rem';
    if (window.innerWidth > 576) {
      width = '50rem';
    }
    this.dialog.open(ContractInvoiceAttachmentComponent, {
      'width': width,
      'height': 'auto',
      data: { id: id, contract_number: this.contract_number, path: path }
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

