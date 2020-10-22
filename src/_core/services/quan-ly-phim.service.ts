import { domain } from './../util/settings/config';
import { Injectable } from '@angular/core';
//Đối tượng HttpClient giúp gọi ajax
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'//giống promise
@Injectable({
  providedIn: 'root'
})
export class QuanLyPhimService {


  
  constructor(private http:HttpClient) { }

  layDanhSachPhim = ():Observable<any[]> => {
    const ob:any = this.http.get(`${domain}/api/quanlyphim/laydanhsachphim?manhom=GP01`);
    return ob;
  }


  layChiTietPhim = (maPhim:any):Observable<any> => {
    const ob:any = this.http.get(`${domain}/api/QuanLyRap/LayThongTinLichChieuPhim?maphim=${maPhim}
    `);
    return ob;
  }


  layThongTinPhongVe = (maLichChieu:number):Observable<any> => {
    const ob:any = this.http.get(`${domain}/api/QuanLyDatVe/LayDanhSachPhongVe?maLichChieu=${maLichChieu}
    `);
    return ob;
  }

}
