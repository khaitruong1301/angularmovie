import { Component, OnInit } from '@angular/core';
import { nguoiDung } from 'src/_core/models/nguoiDung';
import { NguoiDungService } from 'src/_core/services/nguoi-dung.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-dang-ky',
  template:`
      <form class="container" #frmDangKy="ngForm" (ngSubmit)="dangKy(frmDangKy.value)">
          <h3 class="text-center display-4">Đăng ký</h3>
          <div class="form-group">
              <p>Tài khoản</p>
              <input class="form-control" name="taiKhoan" ngModel />
          </div>
          <div class="form-group">
              <p>Họ tên</p>
              <input class="form-control" name="hoTen" ngModel />
          </div>
          <div class="form-group">
              <p>Mật khẩu</p>
              <input class="form-control" name="matKhau" ngModel />
          </div>
          <div class="form-group">
              <p>Email</p>
              <input class="form-control" name="email" ngModel />
          </div>
          <div class="form-group">
              <p>Số Dt</p>
              <input class="form-control" name="soDt" ngModel />
          </div>
          <div class="form-group text-center">
              <button class="btn btn-success">Đăng ký</button>
          </div>
          
      </form>
  `,
  styleUrls: ['./dang-ky.component.scss']
})
export class DangKyComponent implements OnInit {

  //import service gọi api
  constructor(private ndService:NguoiDungService) { }
  ngOnInit(): void {

  }
  dangKy(nguoiDung:nguoiDung):void {
    nguoiDung.maNhom = 'GP01';
    this.ndService.dangKy(nguoiDung).subscribe(res => {
      swal.fire('Thông báo','Đăng ký thành công','success')
      console.log(res);
    },err=>{
      swal.fire('Thông báo',err.error,'error')

      // console.log(err.error);
    })
  }
}
