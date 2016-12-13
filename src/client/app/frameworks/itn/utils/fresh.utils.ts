import { Injectable }    from '@angular/core';


@Injectable()
export class FreshUtilsService {

  _UTCOffset: string;
  _CurDateInUTC: string;


  get UTCOffset(): string {
    return "+0000";
  }

  get CurDateInUTC(): string {

    //Utility to convert browser's time to UTC time
    //Returned format will be: MM/dd/yyyy HH:mm:ss Z
    let UTC, h, m, s, str, offset;
    let dateVar = new Date()
    offset = dateVar.getTimezoneOffset();
    //var UTC = new Date(dateVar.getTime() + dateVar.getTimezoneOffset() * 60000);
    UTC = new Date(dateVar.getTime());
    h = (h = UTC.getHours()) < 10 ? '0' + h : h;
    m = (m = UTC.getMinutes()) < 10 ? '0' + m : m;
    s = (s = UTC.getSeconds()) < 10 ? '0' + s : s;
    //var str = (UTC.getMonth()+1) + "/" + UTC.getDate() + "/" + UTC.getFullYear() + " " + h + ":" + m + ":" + s + " +0000";
    str = (UTC.getMonth()+1) + "/" + UTC.getDate() + "/" + UTC.getFullYear() + " " + h + ":" + m + ":" + s + " "+ this.UTCOffset;
    //alert("DateStr in UTC = " + str);
    return str;
  }
}
