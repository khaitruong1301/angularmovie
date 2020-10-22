import { accessToken } from './../util/settings/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuanLyDatVeService {

  //Tạo giá trị mặc định cho dữ liệu dùng chung (state trong react)
  private danhSachGheDangDat = new BehaviorSubject([]);
  shareDanhSachGheDangDat = this.danhSachGheDangDat.asObservable();
  constructor(private http:HttpClient) { }
  datGhe = async (gheDangDat:any) => {
      //Cách 1 dùng async await
      console.log(gheDangDat)
      //Tạo ra danh sách ghế đang đặt mới
      let data:any = await this.shareDanhSachGheDangDat.pipe();
      //Lấy ra danh sách ghế mặc định 
      let dsGheDangDat = data.source.value;
      const index = dsGheDangDat.findIndex(gheDD=>gheDD.maGhe === gheDangDat.maGhe);
      if(index !== -1) {
        dsGheDangDat.splice(index,1)
      }else {
        dsGheDangDat.push(gheDangDat);
      }
      //Cập nhật lại state 
      //hàm next nhận vào state mới
      this.danhSachGheDangDat.next(dsGheDangDat);
  }


  datVe = (thongTinDatVe:any):Observable<any> =>  {

    console.log(thongTinDatVe)
    let header:HttpHeaders = new HttpHeaders();

    header = header.set('Authorization', `Bearer ${localStorage.getItem(accessToken)}`);


    let obSer = this.http.post(`https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe`,thongTinDatVe,{headers:header,responseType:'text'});
    return obSer;
  }



}
