import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  erorr_in_load(lang: number) {
    if (lang == 1) {
      return "خطا در دریافت";
    } else {
      return "Erorr in recieve";
    }
  }

  erorr_in_save(lang: number) {
    if (lang == 1) {
      return "خطا در ذخیره"
    } else {
      return "---";
    }
  }

  message(lang: number, pe_message: string, en_message: string) {
    return pe_message;
  }

  internet(lang: number) {
    if (lang == 1) {
      return "خطا در اینترنت";
    } else {
      return "Erorr in Enternet";
    }
  }

  erorr_in_save_default(lang: number) {
    if (lang == 1) {
      return "شما می توانید فقط یک گزینه را پیش فرض کنید."
    } else {
      return "---";
    }
  }


  save(lang: number) {
    if (lang == 1) {
      return "با موفقیت ذخیره شد.";
    } else {
      return "";
    }
  }
  //******************************************************************************** */
  repeat(lang: number) {
    if (lang == 1) {
      return "عنوان باید منحصر به فرد باشد.";
    } else {
      return "عنوان باید منحصر به فرد باشد.";
    }
  }

  repeat2(lang: number) {
    if (lang == 1) {
      return "هر عنوان در هر دسته و گروه باید منحصر به فرد باشد.";
    } else {
      return "عنوان باید منحصر به فرد باشد.";
    }
  }


  repeat3(lang: number) {
    if (lang == 1) {
      return "این رکورد قبلا اضافه شده است.";
    } else {
      return "";
    }
  }
  //******************************************************************************** */
  access(lang: number) {
    if (lang == 1) {
      return "خطا در دسترسی";
    } else {
      return "Erorr in Access";
    }
  }

  access2(lang: number) {
    if (lang == 1) {
      return "شما دسترسی به این سرویس را ندارید";
    } else {
      return "----";
    }
  }
  //******************************************************************************** */
  close(lang: number) {
    if (lang == 1) {
      return "بستن";
    } else {
      return "Close";
    }
  }

  add(lang: number) {
    if (lang == 1) {
      return "اضافه شد.";
    } else {
      return "Added.";
    }
  }

  expire(lang: number) {
    if (lang == 1) {
      return "اکانت شما منقضی شده است . لطفا تمدید نمائید.";
    } else {
      return "----";
    }
  }


  //******************************************************************************** */
  delete(lang: number, id: any, changedRows: number): string {
    var number; var text;
    if (typeof id == 'number') {
      if (lang == 1) {
        return "با موفقیت حذف شد";
      } else {
        return "Success in delete";
      }
    }
    else {
      number = id.length;
      if (lang == 1) {
        return " تعداد " + changedRows + " رکورد از " + number + " رکوورد انتخابی شما با موفقیت حذف شدند";
      } else {
        return "----";
      }
    }
    return text;
  }

  delete2(lang: number) {
    if (lang == 1) {
      return "حذف شد.";
    } else {
      return "---";
    }
  }

  message_delete_alarm(lang: number) {
    if (lang == 1) {
      return "این رکورد در ماژول هایی در حال استفاده می باشد و قادر به حذف نخواهید بود";
    } else {
      return "---";
    }
  }

  message_delete_erorr(lang: number) {
    if (lang == 1) {
      return "خطا در حذف";
    } else {
      return "Erorr in delete";
    }
  }

  message_delete_accept(lang: number) {
    if (lang == 1) {
      return "آیا از حذف اطمینان دارید؟";
    } else {
      return "Are you sure for delete";
    }
  }
  //********************************wharehouse************************************************ */
  wharehouse_inventory1(lang: number) {
    if (lang == 1) {
      return "تعدادی درج شده بیشتر ار خروجی انبار می باشد .لطفا اصلاح نمائید.";
    } else { return "---"; }
  }

  wharehouse_alarm_cate(lang: number) {
    if (lang == 1) {
      return "برای درج زیرگروه نیاز است تا گروه انتخاب شده باشد";
    } else { return "---"; }
  }
  //********************************sms************************************************ */
  error_format_cellphone(lang: number) {
    if (lang == 1) {
      return "فرمت شماره برای ارسال پیامک معتبر نمی باشد";
    } else { return "---"; }
  }

  error_sharj_sms(lang: number) {
    if (lang == 1) {
      return "قادر به ارسال پیامک نمی باشید لطفا شارژ نمائید";
    } else { return "---"; }
  }


  error_sharj_sms_with_save(lang: number) {
    if (lang == 1) {
      return "فاکتور یا موفقیت ثبت شد ولی قادر به ارسال پیامک نمی باشید لطفا شارژ نمائید.";
    } else { return "---"; }
  }

  message_sms_accept(lang: number) {
    if (lang == 1) {
      return "آیا از ارسال اطمینان دارید؟";
    } else {
      return "Are you sure for delete";
    }
  }

}
