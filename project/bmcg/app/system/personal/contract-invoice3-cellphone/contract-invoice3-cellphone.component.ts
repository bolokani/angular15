import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ServerService } from '../../services/server/server.service';
import { MatDialog } from '@angular/material/dialog';
import { ContractInvoiceAttachmentComponent } from '../../contract-invoice-attachment/contract-invoice-attachment.component';



@Component({
  selector: 'app-contract-invoice3-cellphone',
  templateUrl: './contract-invoice3-cellphone.component.html',
  styleUrls: ['./contract-invoice3-cellphone.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ContractInvoice3CellphoneComponent implements OnInit {
  @Input('obj') public root_obj: any;
  public sum1: number = 0;
  public contract_number: number;
  dataSource: any;
  columnsToDisplayWithExpand = ['cost_title', 'amount'];
  expandedElement: PeriodicElement | null;

  constructor(
    public serverService: ServerService
    , public dialog: MatDialog) {
    this.serverService.get_invoice_print_cellphone().subscribe(
      (res) => {
        if (res) {
          this.dataSource.data = res.list_record;
        }
      }
    )
  }

  ngOnInit(): void {
    this.dataSource = this.root_obj.list_record;
    this.contract_number = this.root_obj.contract_number;
    this.get_sum1();
  }

  get_sum1() {
    this.sum1 = 0;
    for (var i = 0; i < this.root_obj.list_record.length; i++) {
      this.sum1 = this.sum1 + this.root_obj.list_record[i].finance_financial2_amount;
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
      data: { id: id, contract_number: this.contract_number, path: path }
    })
  }

}


export interface PeriodicElement {
  cost_title: string;
  amount: number;
}
