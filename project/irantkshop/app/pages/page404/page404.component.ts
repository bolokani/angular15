import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})

export class Page404Component implements OnInit {
  public server: any = this.serverService.get_server();
  public loading = false;
  public subscription: Subscription | any;
  public creator: any;
  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public activatedRoute: ActivatedRoute
    , @Inject(DOCUMENT) public document: any) {
    var path = document.location.pathname;
    if (path) {
      this.creator = path.split("/")[1]
    }
  }//end consructor

  ngOnInit() {

  }//end ngOnInit

  //**************************************************
  recieve_message(validation: boolean, en_message: string, pe_message: string, type: number, en_action: string, pe_action: string) {
    if (type == 1) this.loading = false;
    if (validation == true) {
      this.matSnackBar.open(pe_message, pe_action, { duration: 5000 });
    }//end if
    else {
      //this.matSnackBar.dismiss();
    }
  }

}
