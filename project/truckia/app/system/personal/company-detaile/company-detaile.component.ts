import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { identity, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../../services/server/server.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDetaile2Component } from '../company-detaile2/company-detaile2.component';

@Component({
  selector: 'app-company-detaile',
  templateUrl: './company-detaile.component.html',
  styleUrls: ['./company-detaile.component.scss']
})
export class CompanyDetaileComponent implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public lang = JSON.parse(<any>localStorage.getItem('lang'));
  public server: any = this.serverService.get_server();
  public loading = false;
  public loading_update: boolean = false;
  public user_id: number | undefined;
  public subscription: Subscription;
  public form1: FormGroup;
  public token: number;
  public user_token: number;
  public list_record: any = [];

  public company_title: string;
  public company_type: string;
  public company_national_id: string;
  public company_economic_code: string;
  public company_rnumber: string;
  public company_date_registeration: string;
  public company_ceo: string;
  public company_national_code_ceo: string;
  public company_birth_date: string;
  public company_cellphone: string;
  public company_cellphone2: string;
  public user_phone: string;
  public company_phone: string;
  public company_adress: string;
  public company_code_posti: string;
  public company_email: string;
  public state_title: string;
  public city_title: string;
  public id: number;
  public logo_official_newspaper: String;
  public logo_national_card: String;
  public logo_business_card: String;
  public site_logo: String;
  public count: number = 1;
  public current: any;
  public list_gallery: any = [];


  constructor(
    public serverService: ServerService
    , public router: Router
    , public dialog: MatDialog
    , public matSnackBar: MatSnackBar
    , public messageService: MessageService
    , public activatedRoute: ActivatedRoute) {



  }//end consructor

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )

    if (this.user_info) {
      this.user_id = this.user_info.user_id;
      this.user_token = this.user_info.user_token;
      this.get_user();
    }
  }

  get_user() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    var obj = {
      address: 6876,
      user_id: this.user_id,
      user_token: this.user_token
    }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.get_data();
          } else {
            this.serverService.signout();
            this.message(false, "", 1, this.messageService.close(this.lang));
          }
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_data() {
    var obj = { address: 6903, user_id: this.user_id, user_token: this.user_token, id: this.id }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.company_title = res['result'][0].site_company_title;
            this.company_type = res['result'][0].company_type_title;
            this.company_national_id = res['result'][0].site_company_national_id;
            this.company_economic_code = res['result'][0].site_company_economic_code;
            this.company_rnumber = res['result'][0].site_company_rnumber;
            this.company_date_registeration = res['result'][0].site_company_date_registeration;
            this.company_ceo = res['result'][0].site_company_ceo;
            this.company_national_code_ceo = res['result'][0].site_company_national_code_ceo;
            this.company_birth_date = res['result'][0].site_company_birth_date;
            this.company_cellphone = res['result'][0].site_company_cellphone;
            this.company_cellphone2 = res['result'][0].site_company_cellphone2;
            this.user_phone = res['result'][0].user_phone;
            this.company_phone = res['result'][0].site_company_phone;
            this.company_adress = res['result'][0].site_company_adress;
            this.company_code_posti = res['result'][0].site_company_code_posti;
            this.company_email = res['result'][0].site_company_email;
            this.state_title = res['result'][0].site_state_title;
            this.city_title = res['result'][0].site_city_title;
          } else {
            this.company_type = '-';
            this.company_title = '-';
            this.company_national_id = '-';
            this.company_economic_code = '-';
            this.company_rnumber = '-';
            this.company_date_registeration = '-';
            this.company_ceo = '-';
            this.company_national_code_ceo = '-';
            this.company_birth_date = '-';
            this.company_cellphone2 = '-';
            this.user_phone = '-';
            this.company_phone = '-';
            this.company_adress = '-';
            this.company_code_posti = '-';
            this.company_email = '-';
            this.state_title = '-';
            this.city_title = '-';
          }
          if (res['result'][0].site_company_logo_national_card) {
            this.logo_national_card = res['result'][0].site_company_logo_site + "/" + res['result'][0].site_company_logo_national_card;
            this.list_gallery.push({ logo: this.logo_national_card, title: 'کارت ملی' });
          }
          if (res['result'][0].site_company_logo_business_card) {
            this.logo_business_card = res['result'][0].site_company_logo_site + "/" + res['result'][0].site_company_logo_business_card;
            this.list_gallery.push({ logo: this.logo_business_card, title: 'کارت بازرگانی' });
          }
          if (res['result'][0].site_company_logo_official_newspaper) {
            this.logo_official_newspaper = res['result'][0].site_company_logo_site + "/" + res['result'][0].site_company_logo_official_newspaper;
            this.list_gallery.push({ logo: this.logo_official_newspaper, title: 'روزنامه رسمی' });
          }
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }


  open() {
    const dialogRef = this.dialog.open(CompanyDetaile2Component, {
      width: '50rem',
      height: 'auto',
      hasBackdrop: true,
      data: { user_id: this.user_id, type_task: 2, id: this.id }
    });
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.company_type = res.company_type_title;
          this.company_title = res.site_company_title;
          this.company_national_id = res.site_company_national_id;
          this.company_economic_code = res.site_company_economic_code;
          this.company_rnumber = res.site_company_rnumber;
          this.company_date_registeration = res.site_company_date_registeration;
          this.company_ceo = res.site_company_ceo;
          this.company_national_code_ceo = res.site_company_national_code_ceo;
          this.company_birth_date = res.site_company_birth_date;
          this.company_cellphone2 = res.site_company_cellphone2;
          this.company_cellphone = res.site_company_cellphone;
          this.user_phone = res.company_user_phone;
          this.company_phone = res.site_company_phone;
          this.company_adress = res.site_company_adress;
          this.company_code_posti = res.site_company_code_posti;
          this.company_email = res.site_company_email;
          this.state_title = res.site_state_title;
          this.city_title = res.site_city_title;
          this.list_gallery = [];
          if (res.site_company_logo_national_card) {
            this.logo_national_card = res.site_company_logo_site + "/" + res.site_company_logo_national_card;
            this.list_gallery.push({ logo: this.logo_national_card, title: 'کارت ملی' });
          }
          if (res.site_company_logo_business_card) {
            this.logo_business_card = res.site_company_logo_site + "/" + res.site_company_logo_business_card;
            this.list_gallery.push({ logo: this.logo_business_card, title: 'کارت بازرگانی' });
          }
          if (res.site_company_logo_official_newspaper) {
            this.logo_official_newspaper = res.site_company_logo_site + "/" + res.site_company_logo_official_newspaper;
            this.list_gallery.push({ logo: this.logo_official_newspaper, title: 'روزنامه رسمی' });
          }
        }
      }
    )
  }
  //************************************************************************************************** 1 *************************************
  openModal(id: any) {
    if (window.innerWidth > 768) {
      var x = <any>document.getElementById('myModalone');
      x.style.display = "block";
    }

  }//end openModal

  plusSlides(mySlides: any, dot: any, n: any) {
    this.current = this.current + (n);
    var slides = document.getElementsByClassName(mySlides);
    var dots = document.getElementsByClassName("dot");
    if (this.current > slides.length) { this.current = 1; }
    if (this.current < 1) { this.current = slides.length; }
    this.showSlides(mySlides, dot, this.current);
  }//end plusSlides

  currentSlide(mySlides: any, dot: any, n: any) {
    this.current = n;
    this.showSlides(mySlides, dot, n);
  }//end currentSlide  

  showSlides(mySlides: any, dot: any, n: any) {
    var i;
    var slideIndex = n;
    var slides = document.getElementsByClassName(mySlides);
    var dots = document.getElementsByClassName(dot);
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length };
    for (i = 0; i < slides.length; i++) {
      (<HTMLElement>slides[i]).style.display = "none";
    }//end for
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }//end for
    (<HTMLElement>slides[slideIndex - 1]).style.display = "block";
    dots[slideIndex - 1].classList.add("active");
  }//end showSlides 

  close_modal(myModal: any) {
    var x = <any>document.getElementById(myModal);
    x.style.display = "none";
  }
  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) {
      this.loading_update = false;
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

