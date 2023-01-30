import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-detaile',
  templateUrl: './contact-detaile.component.html',
  styleUrls: ['./contact-detaile.component.scss']
})
export class ContactDetaileComponent implements OnInit, OnDestroy {
  public loading = false;
  public subscription: Subscription | any;
  public err: string | undefined; public err_validation: boolean = false;
  public err_internet_text: string | undefined; public err_internet_validation: boolean | undefined;
  public server: any = this.serverService.get_server();
  private id: number | undefined;
  public list_record: any = [];
  public creator: string | undefined;

  public cottage: any;
  public proforma: any;
  public order_id: any;
  public brand_title: any;
  public tip_title: any;
  public fob: number;
  public carry: number;
  public cpt: number;
  public currency_icon: any;
  public shassis: any;
  public engin: any;
  public country_title: any;
  public order_weight: any;
  public bill_weight: any;
  public weight_title: any;
  public process_title: any;
  public delivery_date: any;
  public recept_date: any;
  public position_title: any
  public year_title: any;
  public abortion: any;
  public cid_title: any;
  public missed_day_plate: number = 0;
  public contract_number: string;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public matDialogRef: MatDialogRef<ContactDetaileComponent>
    , @Inject(MAT_DIALOG_DATA) public dialog_data: any) {
    if (dialog_data) {
      this.id = dialog_data.id;
      this.contract_number = dialog_data.contract_number;
    }
  }//end consructor

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 6551, id: this.id }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.list_record.push(res['result'][0]);
            this.cottage = res['result'][0].contract_list_cottage;
            this.proforma = res['result'][0].contract_list_proforma;
            this.order_id = res['result'][0].contract_list_order_id;
            this.brand_title = res['result'][0].site_brand_title;
            this.tip_title = res['result'][0].site_tip_title;
            this.fob = res['result'][0].contract_list_price;
            this.carry = res['result'][0].contract_list_carry;
            this.cpt = res['result'][0].cpt;
            this.currency_icon = res['result'][0].site_currency_icon;
            this.shassis = res['result'][0].contract_list_shassis;
            this.engin = res['result'][0].contract_list_engin;
            this.country_title = res['result'][0].site_country_title;
            this.order_weight = res['result'][0].contract_list_order_weight;
            this.bill_weight = res['result'][0].contract_list_bill_weight;
            this.weight_title = res['result'][0].site_weight_title;
            this.year_title = res['result'][0].site_year_title;
            this.position_title = res['result'][0].site_position_title;
            this.abortion = res['result'][0].contract_list_abortion;
            this.cid_title = res['result'][0].site_cid_title;
            this.process_title = res['result'][0].discharge_process_title;
            this.delivery_date = res['result'][0].contract_list_delivery_date;
            this.recept_date = res['result'][0].contract_list_recept_date;
            this.get_missed_day_plate(res['result'][0].contract_list_contract_date_main, res['result'][0].contract_list_plate_date_main);
          }
          this.recieve_message(false, "", "", 1, "", "");
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.recieve_message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }


  get_missed_day_plate(contract_date: string, plate_date: string) {
    var obj = {
      address: 6736, id: this.id
      , contract_date: contract_date
      , plate_date: plate_date
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.missed_day_plate = res['date'];
        }//end if
        else {
          var pe_message = "خطا در دریافت";
          var pe_action = "بستن";
          this.recieve_message(true, 'Erorr in recieve', pe_message, 1, 'close', pe_action);
        }
      }
    )
  }

  convert_to_int(value: any) {
    return parseInt(value);
  }


  close() {
    this.matDialogRef.close();
  }
  //**************************************************
  recieve_message(validation: boolean, en_message: string, pe_message: string, type: number, en_action: string, pe_action: string) {
    this.err_internet_validation = false;
    if (type == 1) this.loading = false;
    if (validation == true) {
      this.matSnackBar.open(pe_message, pe_action, { duration: 8000 });
    }//end if
    else {
      //this.matSnackBar.dismiss();
    }
  }
  //*******************************************************************************
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }//end if
  }//end OnDestroy
}


