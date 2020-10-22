import { accessToken } from './../../../_core/util/settings/config';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { nguoiDung } from 'src/_core/models/nguoiDung';
import { NguoiDungService } from 'src/_core/services/nguoi-dung.service';
import { userLogin } from 'src/_core/util/settings/config';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-login',
  template:`
    <form class="container" #frmLogin="ngForm" (ngSubmit)="dangNhap(frmLogin.value)">
        <h3 class="text-center display-4">Đăng nhập</h3>    
        <div class="form-group">
            <p>Tài khoản</p>
            <input class="form-control" name="taiKhoan" ngModel/>
        </div>
        <div class="form-group">
            <p>Mật khẩu</p>
            <input class="form-control" name="matKhau" ngModel/>
        </div>
        <div class="form-group">
            <button class="btn btn-success">Đăng nhập</button>
        </div>
    </form>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  public subNguoiDungService:Subscription;

  constructor(private nguoiDungService:NguoiDungService) { }

  dangNhap (nd:nguoiDung):void {
   this.subNguoiDungService = this.nguoiDungService.dangNhap(nd).subscribe(res => {
      //Lưu vào localstorage thông tin đăng nhập và token
      localStorage.setItem(userLogin,JSON.stringify(res));
      localStorage.setItem(accessToken,res.accessToken);
      // console.log(res);
    },err=>{
      console.log(err.error);
    })
  }
  time;
  ngOnInit(): void {
  //  this.time = setInterval(()=>{
  //     console.log(123);
  //   },1000)

  }
  ngOnDestroy(): void {
    clearInterval(this.time)
    this.subNguoiDungService.unsubscribe();
  }
  
}
