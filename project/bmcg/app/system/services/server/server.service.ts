import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class ServerService {
  public isOnline: any;
  public sb_user_logo: Subject<any> = new Subject<any>();
  public loading: boolean | undefined;
  public lang: any | undefined;
  public subscription: Subscription;
  public status = new Subject<any>();
  public sb_logo = new Subject<any>();
  public sb_user = new Subject<any>();
  public sb_invoice_print2 = new Subject<any>();



  constructor(private http: HttpClient, private matSnackBar: MatSnackBar, private router: Router
    , private meta: Meta, private title: Title) { }

  post_address(server: any, address: string, obj: any) {
    var token = ""
    var user_info = JSON.parse(<any>localStorage.getItem('user_info'));
    if (user_info) {
      token = user_info.user_token;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token,
      })
    };
    return this.http.post(server + "/" + address, obj, httpOptions);
  }//end manager_get_data

  post_address_file(server: string, address: string, obj: any) {
    return this.http.post(server + "/" + address, obj, {
      reportProgress: true,
      'observe': 'events'
    });
  }//end manager_get_data

  get_address(server: string, address: string) {
    return this.http.get(server + "/" + address);
  }//end manager_get_data

  no_record: string = " هیچ رکوردی برای نمایش وجود ندارد";

  get_server() {
    return 'https://api.bmcg.ir';
  }

  get_site() {
    return 'https://bmcg.ir';
  }

  get_site_upload_image() {
    return 'https://bmcg.ir';
  }

  get_path_upload_image() {
    return 'object/uploads/images/';
  }

  get_default_user_logo() {
    return "../../../../assets/img/default_user.png";
  }

  get_default_image() {
    return "../../assets/img/default_image.png";
  }
  get_default_image2() {
    return "../../assets/img/default_image2.png";
  }
  get_default_preview() {
    return "../../../../assets/img/preview.png";
  }

  get_phone(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57) && charCode != 32 && charCode != 45) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  get_number(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode >= 48 && charCode <= 57) || charCode == 13) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }


  set_metas(title: any, keywords: any, description: any, author: any) {
    this.meta.updateTag({ name: "keywords", content: keywords });
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'author', content: author });

    if (title == 'not-found') {
      this.meta.updateTag({ name: 'robots', content: "noindex" });
    } else {
      this.meta.updateTag({ name: 'robots', content: "index,follow" });
    }
    this.title.setTitle(title);
  }

  //********************************************************  */
  send_status(value: any): void {
    this.status.next(value);
  }//end send_username

  get_status(): Observable<any> {
    return this.status.asObservable();
  }
  //********************************************************  */
  send_invoice_print2(value: any): void {
    this.sb_invoice_print2.next(value);
  }//end send_username

  get_invoice_print2(): Observable<any> {
    return this.sb_invoice_print2.asObservable();
  }
  //********************************************************  */
  send_user(): void {
    this.status.next(null);
  }//end send_user

  get_user(): Observable<any> {
    return this.status.asObservable();
  }
  //********************************************************  */
  send_logo(value: any): void {
    this.sb_logo.next(value);
  }//end send_username

  get_logo(): Observable<any> {
    return this.sb_logo.asObservable();
  }
  //********************************************************  */
  top() {
    /*
    const config: ScrollToConfigOptions = {
      target: 'menu',
      offset: -10000
    };
    this.scrollToService.scrollTo(config);
    */
  }

  status1(status: number) {
    this.matSnackBar.dismiss();
    if (status == 2) {
      if (JSON.parse(<any>localStorage.getItem('status')) != 1) {
        this.signout();
      }
    }//end if
    //this.check_login();
  }

  //*****************************************
  change_password(server: string, obj: any) {
    return this.http.post(server + "/change_password", obj);
  }
  //*****************************************
  check_internet() {
    this.isOnline = navigator.onLine;
    if (this.isOnline == false) {
      return false;
    }
    else {
      return true;
    }//end else
  }//end check_internet

  //*********************************************** */
  isUnicode(str: any) {
    var letters = [];
    if (str.substring((0), 1).charCodeAt() > 255) { return true; }
    else {
      return false;
    }
  }
  //*********************************************** */
  message_delete(id: any, changedRows: number): string {
    var number; var text;
    if (typeof id == 'number') { text = "با موفقیت حذف شد"; }
    else {
      number = id.length;
      text = " تعداد " + changedRows + " رکورد از " + number + " رکوورد انتخابی شما با موفقیت حذف شدند";
    }
    return text;
  }

  message_delete_alarm(): string {
    var text = "این رکورد در ماژول هایی در حال استفاده می باشد و قادر به حذف نخواهید بود";
    return text;
  }

  message_delete_accept(): any {
    var text = "آیا از حذف اطمینان دارید؟";
    return text;
  }

  message_error(): string {
    var text = "دریافت خطا";
    return text;
  }

  message_action(): string {
    return 'بستن';
  }
  //*********************************************** */
  recieve_message(validation: boolean, en_message: string, pe_message: string, type: number, en_action: string, pe_action: string) {
    if (type == 1) this.loading = false;
    if (validation == true) {
      if (this.lang == 1) this.matSnackBar.open(pe_message, pe_action, { duration: 2000 });
      if (this.lang == 2) this.matSnackBar.open(en_message, en_action, { duration: 2000 });
    }//end if
    else {
      this.matSnackBar.dismiss();
    }
  }
  //*********************************************** */
  signout() {
    var x = JSON.parse(<any>localStorage.getItem("remember"));
    if (x && x.remember == true) {
      localStorage.removeItem("user_info");
      localStorage.removeItem("status");
    } else {
      localStorage.clear();
    }

    this.router.navigate(['/login']);
    this.send_status({ status: 2 });
  }

}
