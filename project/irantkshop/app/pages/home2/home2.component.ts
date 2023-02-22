import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../services/server/server.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserModule, DomSanitizer, Meta } from '@angular/platform-browser';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit, OnDestroy {
  public user_info: any = JSON.parse(<any>localStorage.getItem('user_info'));
  public server: any = this.serverService.get_server();
  public server2: any = this.serverService.get_server2();
  public lang: any = 1;
  public user_id: number | undefined;
  public subscription: Subscription | any;
  public loading = false;
  public list_album: any = [];//for
  public list_other_goods: any = [];
  public list_special_goods: any = [];
  public list_microwave: any = [];


  list_specification: any = [];
  list_course1: any = [];
  list_course2: any = [];
  list_course3: any = [];
  list_content: any = [];
  list_content3: any = [];
  list_gallery: any = [];
  list_special_content: any = [];
  baner_main_middle: any | undefined;
  baner1: string | undefined;
  baner2: string | undefined;
  baner3: string | undefined;
  baner4: string | undefined;
  baner5: string | undefined;
  header_baner1: string | undefined;
  header_baner2: string | undefined;
  header_link_baner2: string | undefined;
  header_baner3: string | undefined;
  movie1: string | undefined;
  list_short_movie: any = [];
  @ViewChild("videoRef", { static: true }) videoRef: ElementRef<HTMLVideoElement> | any;
  content_id1: any | undefined;
  content_title1: any | undefined;
  content_text1: any | undefined;
  content_logo1: string | undefined;
  content_id2: any | undefined;
  content_title2: any | undefined;
  content_text2: any | undefined;
  content_logo2: string | undefined;


  constructor(
    public serverService: ServerService
    , public router: Router
    , public matSnackBar: MatSnackBar
    , public dialog: MatDialog
    , public messageService: MessageService
    , public sanitizer: DomSanitizer,) { }//end consructor

  ngOnInit() {
    this.get_album();
    this.header_baner1 = this.serverService.get_site() + "/object/images/2.jpg";
    this.header_baner2 = this.serverService.get_site() + "/object/images/9.jpg";
    this.header_baner3 = this.serverService.get_site() + "/object/images/8.jpg";
    this.baner5 = this.serverService.get_site() + "/object/images/3.jpg";

    this.get_course1();
    this.get_course2();
    this.get_course3();
    this.get_content3();
    this.get_short_movie();
    this.get_content();
    this.get_baner_middle();
    this.get_baner();
    this.get_special_content();
    this.get_gallery();
    this.get_home_movie();
    this.get_special_goods();

    this.serverService.set_metas('فروشگاه بک لایت تلویزیون و قطعات ماکروفر', 'فروشگاه بک لایت تلویزیون و قطعات ماکروفر', '');
  }

  get_album() {
    this.subscription = this.serverService.post_address(this.server, 'new_address', { address: 1951 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_album = [];
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].site_attach_name) {
              res['result'][i].logo = res['result'][i].site_attach_site + "/" + res['result'][i].site_attach_name;
            }
            this.list_album.push(res['result'][i])
          }
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_home_movie() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2159 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            if (res['result'][0].site_short_course_filename_video) {
              this.movie1 = res['result'][0].site_short_course_site_video + "/" + res['result'][0].site_short_course_path_video + "/" + res['result'][0].site_short_course_filename_video;
            }
          }
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_baner_middle() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2103, id: 63 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.baner_main_middle = res['result'][0].site_content_site_logo + "/" + res['result'][0].site_content_logo;
          }
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_save(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_special_content() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2152 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].site_content_logo) {
              res['result'][i].logo = res['result'][i].site_content_site_logo + "/" + res['result'][i].site_content_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_image();
            }
            this.list_special_content.push(res['result'][i])
          }
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_content_middle(id: number) {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2103, id: 63 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          if (res['num'] == 1) {
            this.content_text1 = this.sanitizer.bypassSecurityTrustHtml(res['result'][0].site_content_text);
            this.content_logo1 = res['result'][0].site_content_site_logo + "/" + res['result'][0].site_content_logo;
          }
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_special_goods() {
    var obj = { address: 2023 }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_special_goods = [];
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo()
            }
            this.list_special_goods.push(res['result'][i]);
          }
          this.get_other_goods(124, 555);
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_other_goods(cate: number, id: number) {
    var obj = { address: 2021, cate: cate }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_other_goods = [];
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo()
            }
            this.list_other_goods.push(res['result'][i]);
          }
          this.get_microwave_goods(118);
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_microwave_goods(cate: number) {
    var obj = { address: 2022, cate: cate }
    this.subscription = this.serverService.post_address(this.server, 'new_address', obj).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          this.list_microwave = [];
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].wharehouse_material_logo) {
              res['result'][i].logo = res['result'][i].wharehouse_material_site_logo + "/" + res['result'][i].wharehouse_material_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_logo()
            }
            this.list_microwave.push(res['result'][i]);
          }

          $(document).ready(function () {
            ($(".owl-carousel") as any).owlCarousel({
              rtl: true,
              loop: true,
              margin: 10,
              autoplay: false,
              nav: true,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 3
                },
                1000: {
                  items: 7
                }
              }
            })
          });
        }//end if
        else {
          this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  open(id: number, title: string) {
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/product-' + id, title1]);
    this.subscription.unsubscribe();
  }


  ge_to_baner() {
    //this.router.navigate(['photo-gallery', "photo"], { queryParams: { id: 126 } })
  }

  get_content_hover(id: number, hover: string) {
    var x = <any>document.getElementById("home-row2" + id);
    x.style.backgroundColor = hover;
  }


  get_content_leave(id: number, hover: string) {
    var x = <any>document.getElementById("home-row2" + id);
    x.style.backgroundColor = hover;
  }

  get_content3() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2008 }).subscribe(
      (res: any) => {
        this.list_content3 = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_content3.push(res['result'][i]);
          }//end for
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }




  get_short_movie() {
    if (this.serverService.check_internet() == false) {
      this.message(true, this.messageService.internet(this.lang), 1, this.messageService.close(this.lang));
      return;
    }//end if
    else { this.matSnackBar.dismiss(); }
    this.loading = true;
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2073 }).subscribe(
      (res: any) => {
        this.list_short_movie = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].site_short_course_logo) {
              res['result'][i].logo = res['result'][i].site_short_course_site_logo + "/" + res['result'][i].site_short_course_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_image();
            }
            this.list_short_movie.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_baner() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2006 }).subscribe(
      (res: any) => {
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].site_baner_id == 1) {
              this.baner1 = res['result'][i].site_baner_site_logo + "/" + res['result'][i].site_baner_logo;
            }
            if (res['result'][i].site_baner_id == 2) {
              this.baner2 = res['result'][i].site_baner_site_logo + "/" + res['result'][i].site_baner_logo;
            }
            if (res['result'][i].site_baner_id == 31) {
              this.baner3 = res['result'][i].site_baner_site_logo + "/" + res['result'][i].site_baner_logo;
            }
            if (res['result'][i].site_baner_id == 18) {
              this.baner4 = res['result'][i].site_baner_site_logo + "/" + res['result'][i].site_baner_logo;
            }
            if (res['result'][i].site_baner_id == 19) {
              //this.baner5 = res['result'][i].site_baner_site_logo + "/" + res['result'][i].site_baner_logo;
            }
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }



  get_content() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2005 }).subscribe(
      (res: any) => {
        this.list_content = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_content.push(res['result'][i]);
          }//end for
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_course1() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2075 }).subscribe(
      (res: any) => {
        this.list_course1 = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].site_course_logo) {
              res['result'][i].logo = res['result'][i].site_course_site_logo + "/" + res['result'][i].site_course_logo;
            } else {
              res['result'][i].logo = this.serverService.get_default_image();
            }
            this.list_course1.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_course2() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2004 }).subscribe(
      (res: any) => {
        this.list_course2 = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].site_course_logo) {
              res['result'][i].logo = this.serverService.get_site() + "/" + "/object/images/10.jpg";
            } else {
              res['result'][i].logo = this.serverService.get_default_image();
            }
            this.list_course2.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_gallery() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2071, id: 124 }).subscribe(
      (res: any) => {
        this.list_gallery = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            this.list_gallery.push(res['result'][i]);
          }//end for
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }

  get_course3() {
    this.subscription = this.serverService.post_address(this.server2, 'new_address', { address: 2003 }).subscribe(
      (res: any) => {
        this.list_course3 = [];
        if (res['status'] == 1) {
          for (var i = 0; i < res['num']; i++) {
            if (res['result'][i].site_course_logo) {
              res['result'][i].logo = this.serverService.get_site() + "/" + "/object/images/10.jpg";
            } else {
              res['result'][i].logo = this.serverService.get_default_image();
            }
            this.list_course3.push(res['result'][i]);
          }//end for
          this.message(false, "", 1, this.messageService.close(this.lang));
        }//end if
        else {
          //this.message(true, this.messageService.erorr_in_load(this.lang), 1, this.messageService.close(this.lang));
        }
      }
    )
  }


  go_to_course(id: number, title: string) {
    return false;
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/detaile', id, title1])
  }

  go_to_content(id: number, title: string) {
    var title_array = title.split(" ");
    var title1: any = '';

    for (var i = 0; i < title_array.length; i++) {
      title1 += title_array[i];
      title1 += "-";
    }
    this.router.navigate(['/content-detaile', id, title1])
  }

  go_to_short_movie(title: string) {
    var title_array = title.split(" ");
    var title1: any = '';

    for (var i = 0; i < title_array.length; i++) {
      title1 += title_array[i];
      title1 += "-";
    }
    this.router.navigate(['/all-courses', title1])
  }

  go_to_short_movie_detaile(id: number, title: string) {
    var title1 = "";
    var title_arr = title.split(" ");
    for (var i = 0; i < title_arr.length; i++) {
      title1 += title_arr[i];
      title1 += "-";
    }
    this.router.navigate(['/detaile2', id, title1])
  }

  ngAfterViewInit() {
  }

  //**************************************************
  message(validation: boolean, message: string, type: number, action: string) {
    if (type == 1) { this.loading = false; }
    if (validation == true) {
      this.matSnackBar.open(message, action, { duration: 8000 });
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