import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class ServerService {

  public sb_user_logo: Subject<any> = new Subject<any>();

  public sb_version: Subject<any> = new Subject<any>();
  public server: any | undefined;
  public site: any | undefined;
  public isOnline: boolean = false;;
  public err_internet_validation: any | undefined;
  public loading: boolean | undefined;
  public lang: any | undefined;
  public subscription: Subscription;
  public status = new Subject<any>();
  public sb_bascket = new Subject<any>();
  public sb_format_date = new Subject<any>();
  public sb_logo = new Subject<any>();
  public sb_count_course = new Subject<any>();
  public sb_user = new Subject<any>();
  public sb_mat_drawer = new Subject<any>();
  public sb_stepper_index = new Subject<any>();
  public sb_order = new Subject<any>();
  public sb_count_order = new Subject<any>();


  api: string = "https://api.kavenegar.com/v1/3434487535504E41564B4F6443614C46725A4764546E46346842733944452B47/verify/lookup.json";



  constructor(
    public http: HttpClient
    , public matSnackBar: MatSnackBar
    , public router: Router
    , public meta: Meta
    , public title: Title) { }

  post_address(server: any, address: string, obj: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'CsLnBuDBG1CpZqsLUMHVc17hK5VjLLj1asdasdadasd',

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
  get_server() {
    return 'https://api2.irantkshop.ir';
  }

  get_server2() {
    return 'https://server.saba2000.ir';
  }

  get_site() {
    return 'https://irantkshop.ir';
  }

  get_current_site() {
    return 'https://irantkshop.ir';
  }

  get_site_upload_image() {
    return 'https://namazi.co';
  }

  get_path_upload_image() {
    return 'object/uploads/images/';
  }

  get_default_user_logo() {
    return "../../../../assets/img/default_user.png";
  }

  get_default_image() {
    return "../../../../assets/img/default_image.png";
  }

  get_default_logo() {
    return "../../../../assets/img/default_logo.png";
  }


  check_internet() {
    return true;
    /*
    this.isOnline = navigator.onLine;
    if (this.isOnline == false) {
      return false;
    }
    else {
      return true;
    }//end else
    */
  }//end check_internet

  set_metas(title: any, keywords: any, description: any) {
    this.meta.updateTag({ name: "keywords", content: keywords });
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'title', content: title });
    if (title == 'not-found') {
      this.meta.updateTag({ name: 'robots', content: "noindex" });
    } else {
      this.meta.updateTag({ name: 'robots', content: "index,follow" });
    }
    this.title.setTitle(title);
  }

  get_number(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  get_no_record_text(lang: number) {
    return 'هیچ رکوردی برای نمایش وجود ندارد';
  }
  //********************************************************  */
  send_order(): void {
    this.sb_order.next(null);
  }//end send_username

  get_order(): Observable<any> {
    return this.sb_order.asObservable();
  }
  //********************************************************* */
  send_count_order(): void {
    //this.sb_count_order.next(null);
  }//end send_username

  get_count_order(): Observable<any> {
    return this.sb_count_order.asObservable();
  }
  //********************************************************  */
  send_status(value: any): void {
    this.status.next(value);
  }//end send_username

  get_status(): Observable<any> {
    return this.status.asObservable();
  }
  //************************************************************** */
  send_stepper_index(value: any): void {
    this.sb_stepper_index.next(value);
  }//end send_stepper_index

  get_stepper_index(): Observable<any> {
    return this.sb_stepper_index.asObservable();
  }//get_stepper_index
  //************************************************************** */
  send_mat_drawer(): void {
    this.sb_mat_drawer.next(null);
  }//end send_username

  get_mat_drawer(): Observable<any> {
    return this.sb_mat_drawer.asObservable();
  }
  //********************************************************  */
  send_user(): void {
    this.sb_user.next(null);
  }//end send_username

  get_user(): Observable<any> {
    return this.sb_user.asObservable();
  }
  //********************************************************  */
  send_bascket(): void {
    this.sb_bascket.next(null);
  }//end send_username

  get_bascket(): Observable<any> {
    return this.sb_bascket.asObservable();
  }
  //********************************************************  */
  send_count_course(): void {
    this.sb_count_course.next(null);
  }//end send_username

  get_count_course(): Observable<any> {
    return this.sb_count_course.asObservable();
  }
  //********************************************************  */
  send_logo(value: any): void {
    this.sb_logo.next(value);
  }//end send_username

  get_logo(): Observable<any> {
    return this.sb_logo.asObservable();
  }
  //********************************************************  */

  send_format_date(value: any): void {
    this.sb_format_date.next(value);
  }//end send_username

  get_format_date(): Observable<any> {
    return this.sb_format_date.asObservable();
  }

  //********************************************************  */
  top() {
    /*
    const config: ScrollToConfigOptions = {
      target: 'menu',
      offset: -10000
    };
    this.scrollToService.scrollTo(config);*/
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
  /*
  check_internet() {
    this.isOnline = navigator.onLine;
    if (this.isOnline == false) {
      return false;
    }
    else {
      return true;
    }//end else
  }//end check_internet
  */
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
    this.err_internet_validation = false;
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
    localStorage.clear();
    this.router.navigate(['/login']);
    this.send_status('');
    localStorage.setItem('lang', JSON.stringify(1));
  }

}
