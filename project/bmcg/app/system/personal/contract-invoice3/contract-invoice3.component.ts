import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MessageService } from '../../services/message/message.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ContractInvoiceAttachmentComponent } from '../../contract-invoice-attachment/contract-invoice-attachment.component';


@Component({
  selector: 'app-contract-invoice3',
  templateUrl: './contract-invoice3.component.html',
  styleUrls: ['./contract-invoice3.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ContractInvoice3Component implements OnInit, OnDestroy {
  //**********************************************************
  public server_main: string = this.serverService.get_server();
  public server: string = this.serverService.get_server();
  public lang: any = JSON.parse(<any>localStorage.getItem('lang'));
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public site: string = this.serverService.get_site();
  public loading: boolean = false;
  public subscription: Subscription | undefined;
  public code: any | undefined;
  public id: number;
  public user_id: number | undefined;
  public user_token: number | undefined;
  public type_task: number | undefined;
  public creator: number | undefined;
  public level: number | undefined;
  public access_service: number | undefined;
  public sum1: number = 0;
  public sum2: number = 0;
  public sum1_letter: string | undefined;
  public sum: number = 0;
  public date!: string;
  public status_title!: string;
  public user_title!: string;
  public device_title!: string;
  public invoice_date!: string;
  public invoice_number!: string;
  public exchange_rate!: number;
  public brand!: String;
  public tip!: String;
  public year_title!: String;
  public color!: String;
  public vin!: String;
  public fulladdress!: string;
  public phone!: string;
  public fax!: string;
  public cellphone!: string;
  public contract_date!: string;
  public list_record: any = [];
  @Input('obj') public root_obj: any;
  //******************************************************************************
  public obj: any;

  //******************************************************************************
  public dataSource: any | undefined;
  public columnsToDisplayWithExpand = ['cost_title', 'date', 'amount', 'for'];
  public expandedElement: PeriodicElement | null;
  //******************************************************************************
  constructor(
    public serverService: ServerService
    , public router: Router
    , public dialog: MatDialog
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
    }
    if (this.root_obj) {
      this.id = this.root_obj.id;
    }
    this.get_financial2();
  }//end ngOnInit 

  get_financial2() {
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6777, contract_id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_record = [];
          for (var i = 0; i < res['num']; i++) {
            this.list_record.push(res['result'][i]);
          }
          this.dataSource = new MatTableDataSource(this.list_record);
          this.get_sum2();
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

  get_attachment(id: number, path: string) {
    var width = '23rem';
    if (window.innerWidth > 576) {
      width = '50rem';
    }
    this.dialog.open(ContractInvoiceAttachmentComponent, {
      'width': width,
      'height': 'auto',
      data: { id: id, contract_number: this.id, path: path }
    })
  }
  //*******************************************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) {
      this.loading = false;
    }
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


export interface PeriodicElement {
  cost_title: string;
  amount: number;
}

