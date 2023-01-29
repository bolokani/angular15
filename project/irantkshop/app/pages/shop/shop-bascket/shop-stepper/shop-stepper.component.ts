import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../../services/server/server.service';

@Component({
  selector: 'app-shop-stepper',
  templateUrl: './shop-stepper.component.html',
  styleUrls: ['./shop-stepper.component.scss']
})
export class ShopStepperComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public step: number;
  public result: number;
  @ViewChild('stepper', { static: true }) stepper: any;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar) {
    this.serverService.get_stepper_index().subscribe(
      (result: number) => {
        this.result = result;
        this.stepper.selectedIndex = result;
      });
  }//end consructor

  ngOnInit() {
  }
  //**************************************************
  recieve_message(validation: boolean, en_message: string, pe_message: string, type: number, en_action: string, pe_action: string) {
    if (validation == true) {
      this.matSnackBar.open(pe_message, pe_action, { duration: 5000 });
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




