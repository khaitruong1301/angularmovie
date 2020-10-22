import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { userLogin } from '../util/settings/config';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {

  constructor(private router:Router) { //Đối tượng router dùng để điều hướng trang (this.props.history.push)

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem(userLogin)){
      //Cho phép điều hướng đến url đích
      return true;
    }{
      //Không cho phép
      this.router.navigate(['/login']);
      return false;
    }
      
  }
  
}
