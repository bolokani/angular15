import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ServerService } from '../services/server/server.service';


/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-invoice-print-cellphone',
  templateUrl: './invoice-print-cellphone.component.html',
  styleUrls: ['./invoice-print-cellphone.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InvoicePrintCellphoneComponent implements OnInit {
  @Input('obj') public root_obj: any;
  public sum1: number = 0;
  dataSource: any;
  columnsToDisplayWithExpand = ['cost_title', 'amount'];
  expandedElement: PeriodicElement | null;

  constructor(public serverService: ServerService) {
    this.serverService.get_invoice_print_cellphone().subscribe(
      (res) => {
        if (res) {
          this.dataSource = [];
          this.dataSource = res.list_cost;
          this.get_sum1(res.list_cost);
        }
      }
    )
  }

  ngOnInit(): void {
    this.dataSource = this.root_obj.list_cost;
    this.get_sum1(this.root_obj.list_cost);

  }

  get_sum1(list_cost: any) {
    this.sum1 = 0;
    for (var i = 0; i < list_cost.length; i++) {
      this.sum1 = this.sum1 + list_cost[i].invoice_cost2_price;
    }
  }

}

export interface PeriodicElement {
  cost_title: string;
  amount: number;
}
