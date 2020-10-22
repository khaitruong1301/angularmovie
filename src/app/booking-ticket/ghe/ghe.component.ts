import { async } from '@angular/core/testing';
import { Component, Input, OnInit } from '@angular/core';
import { QuanLyDatVeService } from 'src/_core/services/quan-ly-dat-ve.service';

@Component({
  selector: 'app-ghe',
  template:`
    <button [disabled]="gheInput.daDat" class="ghe" [ngClass]="{'gheDaDat':gheInput.daDat,'gheVip':gheInput.loaiGhe==='Vip','gheDangDat':dangDat}" (click)="datGhe()">{{gheInput.stt}}</button>
    <ng-content></ng-content>
  `,
  styleUrls: ['./ghe.component.scss']
})
export class GheComponent implements OnInit {

  @Input () gheInput:any = {}

  dangDat:boolean = false;
  constructor(private quanLyDatveService:QuanLyDatVeService) { }

  ngOnInit(): void {
  }
  datGhe = async () => {
    this.dangDat = !this.dangDat;

    //Gọi đến service thay đổi state danhSachGheDangDat
    let gheDangDat = {
      maGhe:this.gheInput.maGhe,
      stt:this.gheInput.stt,
      giaVe:this.gheInput.giaVe,
      dangDat:this.dangDat
    }
    //Gọi service đưa gheDangDat lên (giống dispatch action trong redux)
    await this.quanLyDatveService.datGhe(gheDangDat);
  }

}
