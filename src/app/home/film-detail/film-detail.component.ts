import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { QuanLyPhimService } from 'src/_core/services/quan-ly-phim.service';

@Component({ //decorator
  selector: 'app-film-detail',
  template: `
    <div class="container mt-5">
      <div class="row">
        <div class="col-4">
            <img style="width:100%" [src]="chiTietPhim.hinhAnh" />
        </div>
        <div class="col-8">
            <table class="table">
              <thead>
                <tr>
                  <th>Tên phim</th>
                  <th>{{chiTietPhim.tenPhim}}</th>
                </tr>
                <tr>
                  <th>Mô tả</th>
                  <th>{{chiTietPhim.moTa}}</th>
                </tr>
              </thead>
            </table>
        </div>
      </div>
      <div>
        <h3>Lịch chiếu phim</h3>
        <div class="row">
        <div class="nav flex-column nav-pills col-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">

        <a  *ngFor="let heThongRapChieu of chiTietPhim.heThongRapChieu;let i = index" [ngClass] ="{'active':i===0}" class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#{{heThongRapChieu.maHeThongRap}}" role="tab" aria-controls="v-pills-home" aria-selected="true">
          <img [src]="heThongRapChieu.logo" width="50" height="50" /> {{heThongRapChieu.tenHeThongRap}}
        </a>
      </div>
      <div class="tab-content col-8" id="v-pills-tabContent">
          <div *ngFor="let heThongRapChieu of chiTietPhim.heThongRapChieu;let i = index" [ngClass]="{'active':i===0}" class="tab-pane fade show" id="{{heThongRapChieu.maHeThongRap}}" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <!-- {{heThongRapChieu.tenHeThongRap}} -->
            <div *ngFor="let cumRap of heThongRapChieu.cumRapChieu">
                  <span class="text-danger" style="fontSize:20px;font-weight:bold">{{heThongRapChieu.tenHeThongRap}}</span> - <span class="text-success">{{cumRap.tenCumRap}}</span>
                  <div class="row">
                        <a routerLink="/bookingtiket/{{lichChieu.maLichChieu}}" class="col-3" *ngFor="let lichChieu of cumRap.lichChieuPhim.slice(0,12)" routerLink="/">
                          {{lichChieu.ngayChieuGioChieu | date : 'hh:mm:a'}}
                        </a>
                  </div>
            </div>
          </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {

  public chiTietPhim: any = {}
  public maPhim: number = 0;
  constructor(
    private atvRoute: ActivatedRoute, //Đối tượng get param từ url
    private qlyPhimService: QuanLyPhimService,
    private title: Title
  ) { }

  async ngOnInit() {
    //Dùng đối tượng atvRoute lấy param từ url gọi service lấy dữ liệu chi tiết phim => binding lên giao diện
    // this.atvRoute.params.subscribe((param) => {
    //   console.log(param.maPhim);
    //   //Sau khi lấy param gọi hàm lấy chi tiết phim
    //   this.layChiTietPhim(param.maPhim);
    // })

    try {
      //Lấy param từ api
      let res: any = await this.atvRoute.queryParams.pipe();
      //set title cho trang
      this.title.setTitle(res.value.biDanh)
      //Gọi api lấy chi tiết phim
      let data = await this.qlyPhimService.layChiTietPhim(res.value.maPhim).toPromise();
      console.log(data);
      //Lấy chi tiết phim gán vào data
      this.chiTietPhim = data;

    } catch (err) {
      console.log(err)
    }


  }

  layChiTietPhim(maPhim): void {
    this.qlyPhimService.layChiTietPhim(maPhim).subscribe((res) => {
      this.chiTietPhim = res;
      console.log(this.chiTietPhim)
    }, err => {
      console.log(err)
    })
  }

}
