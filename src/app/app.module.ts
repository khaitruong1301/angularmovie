import { LayoutModule } from './home/layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './home/home-page/home-page.component';
import { ContactComponent } from './home/contact/contact.component';
import { AboutComponent } from './home/about/about.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeModule } from './home/home.module';
//Thư viện kết nối api (giống axios cung cấp các đối tượng gọi request từ backend)
import {HttpClientModule} from '@angular/common/http';
import { BookingTicketComponent } from './booking-ticket/booking-ticket.component';
import { GheComponent } from './booking-ticket/ghe/ghe.component'

//Định nghĩa đường dẫn (url) load component
const appRoutes: Routes = [
  { path: '', loadChildren: () => HomeModule },
  { path: 'home', loadChildren: () => HomeModule },

];

@NgModule({
  declarations: [
    AppComponent,
    BookingTicketComponent,
    GheComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes),HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
