import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuanLyDatVeService } from 'src/_core/services/quan-ly-dat-ve.service';
import { QuanLyPhimService } from 'src/_core/services/quan-ly-phim.service';
import { userLogin } from 'src/_core/util/settings/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-ticket',
  template: `
    <div class="container-fluid mt-5">
    <div class="row">
        <div class="col-8 text-center" >
            <!--Thông tin ghế-->
              <img src="https://tix.vn/app/assets/img/icons/screen.png" style="width:100%" />
            <app-ghe [gheInput]="ghe" *ngFor="let ghe of thongTinPhongVe.danhSachGhe;let i = index;">
                <br *ngIf="(i+1)%16 ===0 "/>
            </app-ghe>


        </div>

        <div class="col-4">
            <!--Thông tin phim-->
            <div class="text-success display-4">{{tinhTongTien() | number}}</div>
            <hr />
            <div>Tên phim: {{thongTinPhongVe.thongTinPhim?.tenPhim}}</div>
            <div>Địa điểm: {{thongTinPhongVe.thongTinPhim?.diaChi}}</div>
            <div>Cụm rạp: {{thongTinPhongVe.thongTinPhim?.tenCumRap}} - {{thongTinPhongVe.thongTinPhim?.tenRap}}</div>
            <div>Ngày giờ chiếu: {{thongTinPhongVe.thongTinPhim?.ngayChieu}} - {{thongTinPhongVe.thongTinPhim?.gioChieu}}</div>
            <hr />
            <h3>Danh sách ghế đang đặt</h3>
            Ghế: <span *ngFor="let gheDangDat of danhSachGheDangDat"> {{gheDangDat.stt}}</span>
            <hr />
            <button (click)="datVe()" class="btn btn-success w-100">
                <span class="display-4" >ĐẶT VÉ</span>
            </button>
        </div>
        
    </div>
</div>
  `,
  styleUrls: ['./booking-ticket.component.scss']
})
export class BookingTicketComponent implements OnInit {

  maLichChieu: number = 0;
  thongTinPhongVe: any = {}
  constructor(private atv: ActivatedRoute, private qlyPhimService: QuanLyPhimService, private quanLyDatVe: QuanLyDatVeService,private router:Router) { }
  danhSachGheDangDat: any[] = [];
  async ngOnInit() {
    //Lấy dữ liệu từ url về (maLichChieu)
    let param: any = await this.atv.params.pipe();

    this.maLichChieu = param.value.maLichChieu;

    //Gọi service lấy giá trị từ api về
    this.qlyPhimService.layThongTinPhongVe(this.maLichChieu).subscribe((res) => {
      this.thongTinPhongVe = res;
      console.log(this.thongTinPhongVe)
    }, err => {
      console.log(err);
    })
    //Hàm luôn lắng nghe sự thay đổi của state danhSachGheDangDat 
    this.quanLyDatVe.shareDanhSachGheDangDat.subscribe((stateDSGheDangDat) => {
      //Lấy state gán về thuộc tính danhSachGheDangDat => component render lại html (thay đổi thuộc tính)
      this.danhSachGheDangDat = stateDSGheDangDat;
      console.log(this.danhSachGheDangDat);
    })

  }

  tinhTongTien = () => {
    // let tongTien = this.danhSachGheDangDat.reduce((tongTienVe, gheDD, index) => {
    //   return tongTienVe += gheDD.giaVe;
    // }, 0)
    let tongTien = 0;
    for (let gheDD of this.danhSachGheDangDat) {
      tongTien += gheDD.giaVe;
    }

    return tongTien;
  }

  datVe = () => {

      let usLogin = JSON.parse( localStorage.getItem(userLogin));
      let thongTinDatVe = {
        maLichChieu: this.maLichChieu,
        danhSachVe:this.danhSachGheDangDat,
        taiKhoanNguoiDung: usLogin.taiKhoan
      }
      console.log(thongTinDatVe)
      //Có thông tin đặt vé gọi service
      this.quanLyDatVe.datVe(thongTinDatVe).subscribe(res=>{
        console.log(res);

        Swal.fire('Thông báo',res,'success').then(()=>{
            //Load lại trang sau khi xuất thông báo thành công
            // this.router.navigate(['bookingtiket',this.maLichChieu])
            window.location.reload();
        })

      },err=>{
        console.log(err.error)
      })


  }


}
