import { Component, OnInit } from '@angular/core';
import { QuanLyPhimService } from 'src/_core/services/quan-ly-phim.service';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="container">
        <h3 class="display-4 text-center">Danh sách phim</h3>
        <div class="row">
          <div class="col-4" *ngFor="let phim of dsPhim">
            <div class="card text-left">
              <img class="card-img-top" onError="this.src='https://picsum.photos/200'" [src]="phim.hinhAnh" alt="phim.hinhAnh">
              <div class="card-body">
                <h4 class="card-title">{{phim.tenPhim}}</h4>
                <p class="card-text">{{phim.moTa}}</p>
                <!-- <button class="btn btn-success" routerLink="/filmDetail/{{phim.maPhim}}">ĐẶT VÉ</button>
                <button class="btn btn-success" [routerLink]="['/filmDetail',phim.maPhim]">ĐẶT VÉ</button> -->
                <button [routerLink]="['/filmDetail']" [queryParams]="{maPhim:phim.maPhim,biDanh:phim.biDanh}" class="btn btn-success">
                  ĐẶT VÉ
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  `,
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  dsPhim: any[] = [];
  constructor(private qlPhimService:QuanLyPhimService) { }
  ngOnInit(): void {//chạy sau khi html render xong
    this.qlPhimService.layDanhSachPhim().subscribe((res=> {
      console.log(res);
      this.dsPhim = res;
    }),err=>{
      console.log(err);
    })
  }

}
