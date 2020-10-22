import { ConstantPool } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  template: `
    <form #registerForm="ngForm" class="form-horizontal container" (ngSubmit)="dangKy(registerForm.value)">
      <h3 class="display-4 text-center">Đăng ký</h3>  
      <div class="form-group">
          <p>Email</p>
          <input maxlength="32" minlength="6" #inputEmail="ngModel" class="form-control" name="email" placeholder="email" ngModel required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
          <div *ngIf="inputEmail.errors && (inputEmail.touched || inputEmail.dirty)" class="alert alert-danger" >
            <div *ngIf="inputEmail.errors.required" class="text text-danger">Email không được bỏ trống</div>
            <div *ngIf="inputEmail.errors.pattern" class="text text-danger">Email không hợp lệ</div>

            <div *ngIf="inputEmail.errors.minlength || inputEmail.errors.maxLength" class="text text-danger">Email từ 6 - 32 ký tự</div>
          </div>
      </div>
      <div class="form-group">
          <p>name</p>
          <input class="form-control" name="name" placeholder="name" ngModel />
      </div>

      <div class="form-group">
          <p>School</p>
          <select name="school" class="form-control" ngModel>
            <option value="khoaHocTuNhien">Khoa học tự nhiên</option>
            <option value="bachKhoa">Bách khoa</option>
          </select>
      </div>
      <div class="form-group">
          <button type="submit" [disabled]="registerForm.invalid" class="btn btn-danger">Đăng ký</button>
          <button type="button" (click)="setValueForm()">Set Value form</button>
      </div>
    </form>
  `,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

 
  constructor() { }
  ngOnInit(): void {
 
  }
  @ViewChild('registerForm')  formRegiser:NgForm;
 
  setValueForm = () => {
    console.log(this.formRegiser)
    this.formRegiser.setValue({
      name:'adsadas',
      email:'abc@gmail.com',
      school:'bachKhoa'
    })
  }
  dangKy(value:NgForm)
  {
    
    console.log(value);
    
  }

}
