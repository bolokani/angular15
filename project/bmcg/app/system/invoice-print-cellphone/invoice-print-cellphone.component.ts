import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MessageService } from '../services/message/message.service';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  dataSource: any;
  columnsToDisplayWithExpand = ['type', 'cost_title', 'amount'];
  expandedElement: PeriodicElement | null;

  ngOnInit(): void {
    console.log(this.root_obj.list_cost)
    this.dataSource = this.root_obj.list_cost;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}
