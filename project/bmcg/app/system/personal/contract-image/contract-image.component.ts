import { Component, OnInit, OnDestroy, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contract-image',
  templateUrl: './contract-image.component.html',
  styleUrls: ['./contract-image.component.scss']
})
export class ContractImageComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public id: number;
  public logo: string;

  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , @Inject(MAT_DIALOG_DATA) public dialog_data: any
    , public matDialogRef: MatDialogRef<ContractImageComponent>) {
    if (dialog_data) {
      this.id = dialog_data.id;
      this.logo = dialog_data.logo;
    }
  }//end consructor

  ngOnInit() {
  }

  close() {
    this.matDialogRef.close();
  }
  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) this.loading = false;
    if (validation == true) {
      this.matSnackBar.open(message, action, { duration: 3000 });
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