import { domain } from './../util/settings/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { nguoiDung } from '../models/nguoiDung';


@Injectable({
  providedIn: 'root'
})
export class NguoiDungService {

  constructor(private http: HttpClient) { }

  public dangKy(nguoiDung: nguoiDung): Observable<any> {
    const header = new HttpHeaders();
    header.append("Content-Type", "application/json")

    let res: any = this.http.post(`${domain}/api/QuanLyNguoiDung/DangKy`, nguoiDung, { headers: header });
    return res;
  }

  public dangNhap (nguoiDung:nguoiDung) : Observable<any> {
    const header = new HttpHeaders();
    header.append("Content-Type", "application/json")

    let res: any = this.http.post(`${domain}/api/QuanLyNguoiDung/DangNhap`, nguoiDung, { headers: header });
    return res;
  }

}
