import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LayoutModule } from './layout/layout.module';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FormsModule } from '@angular/forms';
import { DangKyComponent } from './dang-ky/dang-ky.component';
import { BookingTicketComponent } from '../booking-ticket/booking-ticket.component';
import { IsLoginGuard } from 'src/_core/auth/is-login.guard';


//Định nghĩa component khi người dùng /home hoặc / 

const homeRoutes: Routes = [
  {path:'',component:HomeLayoutComponent,children:[
    {path:'',component:HomePageComponent},
    {path:'home',component:HomePageComponent},
    {path:'about',component:AboutComponent},
    {path:'contact',component:ContactComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'dangky',component:DangKyComponent},
    // {path:'filmDetail/:maPhim',component:FilmDetailComponent},
    {path:'filmDetail',component:FilmDetailComponent},
    {path:'bookingtiket/:maLichChieu',component:BookingTicketComponent,canActivate:[IsLoginGuard]},
    {path:'**',component:HomePageComponent}
  ]}
]
//homeRoutes quản lý router-outlet cấp 2 (chứa trong thẻ HomeLayout)
@NgModule({
  declarations: [HomePageComponent, ContactComponent, AboutComponent, LoginComponent, RegisterComponent,HomeLayoutComponent, FilmDetailComponent, DangKyComponent],
  imports: [
    
    //import layout module để sử dụng được thẻ header trong các component khai báo phía trên declaration
    CommonModule,RouterModule.forChild(homeRoutes),LayoutModule,FormsModule
  ]
})
export class HomeModule { }
